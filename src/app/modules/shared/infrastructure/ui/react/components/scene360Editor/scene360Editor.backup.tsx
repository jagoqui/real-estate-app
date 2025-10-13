/* eslint-disable max-lines-per-function */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DynamicIcon } from '@/modules/shared/infrastructure/ui/react/components/dynamicIcon/dynamicIcon';
import { ChevronDown, ChevronUp, Trash2, Upload } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export interface Hotspot {
  id: string;
  u: number; // 0..1
  v: number; // 0..1
  title?: string;
  description?: string;
  icon?: string;
}

export interface Scene360 {
  id: string;
  name: string;
  preview: string; // data URL or url
  file?: { id: string; file: File; name: string; size: number };
  hotspots: Array<Hotspot>;
}

export interface View360 {
  id: string;
  name: string;
  scenes: Array<Scene360>;
}

export type ViewMode = 'navigate' | 'add-hotspot';

interface Props {
  value?: Array<View360>;
  onChange?: (views: Array<View360>) => void;
}

export const Scene360Editor = ({ value = [], onChange }: Props): React.ReactElement => {
  const [views, setViews] = useState<Array<View360>>(value || []);
  const [selectedViewIndex, setSelectedViewIndex] = useState<number>(0);
  const [selectedSceneIndex, setSelectedSceneIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>('navigate');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);
  const hotspotSpritesRef = useRef<Record<string, THREE.Sprite>>({});
  const controlsRef = useRef({ lat: 0, lon: 0, fov: 75 });
  const lastClickTimeRef = useRef<number>(0);
  
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const isInitializedRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const SPHERE_RADIUS = 500;
  const SPHERE_WIDTH_SEGMENTS = 60;
  const SPHERE_HEIGHT_SEGMENTS = 40;
  const SPRITE_SCALE = 20;
  const CAMERA_FOV = 75;
  const CAMERA_NEAR = 0.1;
  const CAMERA_FAR = 1000;
  const POLAR_OFFSET = 90;
  const FULL_CIRCLE = 2;
  const HALF = 0.5;
  const NORMALIZE = 2;
  const KB_SIZE = 1024;
  const BYTES_TO_MB = KB_SIZE * KB_SIZE;
  const FALLBACK_COLOR = 0x404040;
  const WHITE_COLOR = 0xffffff;
  const RANDOM_BASE = 36;
  const RANDOM_START = 2;
  const RANDOM_LENGTH = 9;
  const HOTSPOT_DELAY = 100;

  // Initialize with external value only once
  useEffect(() => {
    if (!isInitializedRef.current && value && value.length > 0) {
      setViews(value);
      isInitializedRef.current = true;
    }
  }, [value]);

  // Report changes back to parent (but not on initial load)
  useEffect(() => {
    if (isInitializedRef.current) {
      onChange?.(views);
    }
  }, [views, onChange]);

  // Get current view and scene
  const currentView = views[selectedViewIndex];
  const currentScene = currentView?.scenes[selectedSceneIndex];

  // Initialize three.js renderer and scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(WHITE_COLOR, 1.0); // Set clear color to white
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      canvas.clientWidth / canvas.clientHeight,
      CAMERA_NEAR,
      CAMERA_FAR
    );
    camera.position.set(0, 0, CAMERA_NEAR);
    cameraRef.current = camera;

    // sphere geometry with inside-out faces
    const geometry = new THREE.SphereGeometry(SPHERE_RADIUS, SPHERE_WIDTH_SEGMENTS, SPHERE_HEIGHT_SEGMENTS);
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      color: WHITE_COLOR,
      side: THREE.BackSide,
    }); // Start with white for better texture visibility
    const sphere = new THREE.Mesh(geometry, material);
    sphere.name = 'panorama-sphere';
    scene.add(sphere);

    const animate = (): void => {
      requestAnimationFrame(animate);
      // simple lon/lat controls
      const { lat, lon, fov } = controlsRef.current;
      if (cameraRef.current) {
        cameraRef.current.fov = fov;
        cameraRef.current.updateProjectionMatrix();
        const phi = THREE.MathUtils.degToRad(POLAR_OFFSET - lat);
        const theta = THREE.MathUtils.degToRad(lon);
        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.cos(phi);
        const z = Math.sin(phi) * Math.sin(theta);
        cameraRef.current.lookAt(new THREE.Vector3(x, y, z));
      }
      renderer.render(scene, camera as THREE.Camera);
    };

    animate();
    
    // Force initial render to show white canvas
    renderer.render(scene, camera);
    console.info('✅ Three.js scene initialized and rendered');

    const handleResize = (): void => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h);
      if (cameraRef.current) cameraRef.current.aspect = w / h;
      if (cameraRef.current) cameraRef.current.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    // init raycaster
    raycasterRef.current = new THREE.Raycaster();
    mouseRef.current = new THREE.Vector2();
    return (): void => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      // dispose sprites (copy ref to local to avoid stale ref warnings)
      const localSprites = { ...hotspotSpritesRef.current };
      Object.values(localSprites).forEach(s => {
        if (s.material) (s.material as THREE.Material).dispose();
        if ((s as any).geometry) (s as any).geometry?.dispose?.();
      });
    };
  }, []);

  // load texture for selected scene
  useEffect(() => {
    if (!currentScene || !currentScene.preview) {
      console.warn('No current scene or preview available');
      return;
    }
    
    console.info('Loading texture for scene:', currentScene.name);

    const sphere = sceneRef.current?.getObjectByName('panorama-sphere') as THREE.Mesh | undefined;
    if (!sphere || !sphere.material) {
      console.warn('Sphere or material not found');
      return;
    }

    const material = sphere.material as THREE.MeshBasicMaterial;
    
    // Set loading state - show white while loading
    material.color.setHex(WHITE_COLOR);
    material.map = null;
    material.needsUpdate = true;
    
    // Force immediate render to show white
    if (rendererRef.current && cameraRef.current && sceneRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }

    // Clean up previous texture
    if (textureRef.current) {
      textureRef.current.dispose();
      textureRef.current = null;
    }

    const loader = new THREE.TextureLoader();
    
    // Add CORS handling for data URLs
    loader.setCrossOrigin('anonymous');
    
    loader.load(
      currentScene.preview,
      tex => {
        console.info('✅ Texture loaded successfully for scene:', currentScene.name);
        console.info('Texture info:', {
          width: (tex.image as HTMLImageElement)?.width,
          height: (tex.image as HTMLImageElement)?.height,
          format: tex.format,
          type: tex.type
        });

        // Configure texture for panoramic display
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.flipY = false;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;

        textureRef.current = tex;

        // Apply texture to material
        material.map = tex;
        material.color.setHex(WHITE_COLOR); // White to not tint texture
        material.needsUpdate = true;

        console.info('✅ Material updated, forcing render');
        
        // Force render to show new texture
        if (rendererRef.current && cameraRef.current && sceneRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      },
      progress => {
        if (progress.total > 0) {
          const percent = (progress.loaded / progress.total * 100).toFixed(1);
          console.info('Loading texture progress:', percent + '%');
        }
      },
      error => {
        console.error('❌ Error loading texture for scene:', currentScene.name);
        console.error('Error details:', error);
        console.error('Failed URL length:', currentScene.preview.length);
        console.error('URL starts with:', currentScene.preview.substring(0, 100));
        
        // Set fallback color
        material.color.setHex(FALLBACK_COLOR);
        material.map = null;
        material.needsUpdate = true;
        
        // Force render to show fallback
        if (rendererRef.current && cameraRef.current && sceneRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      }
    );
  }, [currentScene, selectedViewIndex, selectedSceneIndex]);

  // Handle canvas click for adding hotspots
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only add hotspots in add-hotspot mode
    if (viewMode !== 'add-hotspot') return;
    
    // Prevent multiple clicks in quick succession
    const now = Date.now();
    if (now - lastClickTimeRef.current < HOTSPOT_DELAY) {
      return;
    }
    lastClickTimeRef.current = now;
    
    const canvas = canvasRef.current;
    if (!canvas || !currentScene) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const u = x / rect.width;
    const v = y / rect.height;

    // Validate coordinates
    if (u < 0 || u > 1 || v < 0 || v > 1) return;

    // Create new hotspot
    const newHotspot: Hotspot = {
      id: `hotspot-${Date.now()}-${Math.random().toString(RANDOM_BASE).substr(RANDOM_START, RANDOM_LENGTH)}`,
      u,
      v,
      title: 'New hotspot',
      description: '',
      icon: 'pin',
    };

    // Update views state
    setViews(prev => {
      const copy = [...prev];
      const view = copy[selectedViewIndex];
      if (!view) return prev;
      
      const scene = view.scenes[selectedSceneIndex];
      if (!scene) return prev;
      
      scene.hotspots = [...scene.hotspots, newHotspot];
      return copy;
    });

    // Add sprite after state update
    setTimeout(() => addOrUpdateHotspotSprite(newHotspot), HOTSPOT_DELAY);
  };  // compute 3D position on sphere from uv (u: 0..1 left->right, v: 0..1 top->bottom)
  const uvToSphere = (u: number, v: number, radius = SPHERE_RADIUS): THREE.Vector3 => {
    // equirectangular mapping
    const theta = (u - HALF) * Math.PI * FULL_CIRCLE; // -PI..PI
    const phi = v * Math.PI; // 0..PI
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
  };

  const addOrUpdateHotspotSprite = React.useCallback((hotspot: Hotspot): void => {
    const scene = sceneRef.current;
    if (!scene) return;
    const sphere = scene.getObjectByName('panorama-sphere') as THREE.Mesh | undefined;
    if (!sphere) return;

    const pos = uvToSphere(hotspot.u, hotspot.v, SPHERE_RADIUS);

    let sprite = hotspotSpritesRef.current[hotspot.id];
    if (!sprite) {
      const map = new THREE.TextureLoader().load('/pin.png', () => {});
      const mat = new THREE.SpriteMaterial({ map, sizeAttenuation: false });
      sprite = new THREE.Sprite(mat);
      sprite.scale.set(SPRITE_SCALE, SPRITE_SCALE, 1);
      hotspotSpritesRef.current[hotspot.id] = sprite;
      scene.add(sprite);
    }
    sprite.position.copy(pos);
  }, []);

  // update sprites when scenes or selected scene change
  useEffect(() => {
    const s = scenes[selectedSceneIndex];
    // remove any existing sprites
    const prev = { ...hotspotSpritesRef.current };
    Object.keys(prev).forEach(k => {
      const sp = prev[k];
      sp.parent?.remove(sp);
      delete hotspotSpritesRef.current[k];
    });
    if (!s) return;
    s.hotspots.forEach(h => addOrUpdateHotspotSprite(h));
  }, [scenes, selectedSceneIndex, addOrUpdateHotspotSprite]);

  // handle click selection via raycast
  const handleCanvasPointerUp = (e: React.PointerEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    if (!canvas || !renderer || !camera) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * NORMALIZE - 1;
    const y = -((e.clientY - rect.top) / rect.height) * NORMALIZE + 1;
    if (!raycasterRef.current || !mouseRef.current) return;
    mouseRef.current.set(x, y);
    raycasterRef.current.setFromCamera(mouseRef.current, camera);
    const scene = sceneRef.current;
    if (!scene) return;
    const intersects = raycasterRef.current.intersectObjects(Object.values(hotspotSpritesRef.current));
    if (intersects.length > 0) {
      const obj = intersects[0].object as THREE.Sprite;
      const found = Object.entries(hotspotSpritesRef.current).find(([, s]) => s === obj);
      if (found) {
        const id = found[0];
        setSelectedHotspotId(id);
      }
    } else {
      setSelectedHotspotId(null);
    }
  };

  const handleAddScenes = (files: FileList): void => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, index) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not a valid image file`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev): void => {
        const result = ev.target?.result;
        const preview = typeof result === 'string' ? result : '';
        const newScene: Scene360 = {
          id: `${Date.now()}-${index}`,
          name: file.name,
          preview,
          file: { id: `${Date.now()}-${index}`, file, name: file.name, size: file.size },
          hotspots: [],
        };
        setScenes(prev => {
          const updated = [...prev, newScene];
          // Only update selected index for the first file
          if (index === 0) {
            setSelectedSceneIndex(updated.length - 1);
          }
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveScene = (index: number): void => {
    setScenes(prev => prev.filter((_, i) => i !== index));
    setSelectedSceneIndex(0);
  };

  const moveScene = (index: number, dir: -1 | 1): void => {
    setScenes(prev => {
      const copy = [...prev];
      const item = copy.splice(index, 1)[0];
      copy.splice(index + dir, 0, item);
      return copy;
    });
    setSelectedSceneIndex(i => Math.max(0, Math.min(scenes.length - 1, i + dir)));
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number): void => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number): void => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    setScenes(prev => {
      const copy = [...prev];
      const draggedItem = copy.splice(draggedIndex, 1)[0];
      copy.splice(dropIndex, 0, draggedItem);
      return copy;
    });

    // Update selected index if needed
    if (selectedSceneIndex === draggedIndex) {
      setSelectedSceneIndex(dropIndex);
    } else if (selectedSceneIndex > draggedIndex && selectedSceneIndex <= dropIndex) {
      setSelectedSceneIndex(selectedSceneIndex - 1);
    } else if (selectedSceneIndex < draggedIndex && selectedSceneIndex >= dropIndex) {
      setSelectedSceneIndex(selectedSceneIndex + 1);
    }

    setDraggedIndex(null);
  };

  // File drag and drop handlers
  const handleFileDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleFileDragLeave = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleAddScenes(files);
    }
  };

  const openFileDialog = (): void => {
    fileInputRef.current?.click();
  };

  // Add new view handler
  const handleAddView = (): void => {
    const newView: View360 = {
      id: Date.now().toString(),
      name: `View ${views.length + 1}`,
      scenes: []
    };
    
    setViews(prev => [...prev, newView]);
    setSelectedViewIndex(prev => prev.length); // Select the new view
    setSelectedSceneIndex(0);
  };

  // Add scenes to current view
  const handleAddScenes = (files: FileList): void => {
    if (!currentView) return;
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          const newScene: Scene360 = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name.replace(/\.[^/.]+$/, ''),
            preview: reader.result as string,
            file: { id: Date.now().toString(), file, name: file.name, size: file.size },
            hotspots: []
          };

          setViews(prev => {
            const copy = [...prev];
            const view = copy[selectedViewIndex];
            if (view) {
              view.scenes = [...view.scenes, newScene];
            }
            return copy;
          });
        };
        reader.readAsDataURL(file);
      }
    });
  };

  // Toggle fullscreen for canvas only
  const handleFullscreenToggle = (): void => {
    const container = canvasContainerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        void container.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        void document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = (): void => {
      setIsFullscreen(!!(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">360° Virtual Tours</Label>
        <Button type="button" onClick={handleAddView} variant="outline" size="sm">
          + Add New View
        </Button>
      </div>

      {/* Views Navigation */}
      {views.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {views.map((view, index) => (
            <Button
              key={view.id}
              type="button"
              variant={index === selectedViewIndex ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedViewIndex(index);
                setSelectedSceneIndex(0);
              }}
              className="flex-shrink-0"
            >
              {view.name} ({view.scenes.length})
            </Button>
          ))}
        </div>
      )}

      {/* Current View Management */}
      {currentView && (
        <div className="space-y-4">
          {/* View Name Editor */}
          <div className="flex items-center gap-2">
            <Input
              value={currentView.name}
              onChange={e => {
                const newName = e.target.value;
                setViews(prev => {
                  const copy = [...prev];
                  const view = copy[selectedViewIndex];
                  if (view) {
                    view.name = newName;
                  }
                  return copy;
                });
              }}
              className="font-medium"
              placeholder="View name..."
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setViews(prev => prev.filter((_, i) => i !== selectedViewIndex));
                setSelectedViewIndex(Math.max(0, selectedViewIndex - 1));
                setSelectedSceneIndex(0);
              }}
              disabled={views.length <= 1}
            >
              Delete View
            </Button>
          </div>

          {/* Upload Area for Scenes */}
          <div
            className={`
              border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
              ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
              hover:border-primary hover:bg-primary/5
            `}
            onDrop={handleFileDrop}
            onDragOver={handleFileDragOver}
            onDragLeave={handleFileDragLeave}
            onClick={openFileDialog}
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">Add scenes to "{currentView.name}"</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Drop panoramic images here or click to browse
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={e => {
              const files = e.target.files;
              if (files && files.length > 0) {
                handleAddScenes(files);
              }
              e.currentTarget.value = '';
            }}
            className="hidden"
          />

          {/* Scenes in Current View */}
          {currentView.scenes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Scenes ({currentView.scenes.length})</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant={viewMode === 'navigate' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('navigate')}
                  >
                    Navigate
                  </Button>
                  <Button
                    type="button"
                    variant={viewMode === 'add-hotspot' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('add-hotspot')}
                  >
                    Add Hotspots
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {currentView.scenes.map((scene, index) => (
                  <div
                    key={scene.id}
                    className={`
                      relative cursor-pointer transition-all border-2 rounded-lg overflow-hidden
                      ${index === selectedSceneIndex ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-muted-foreground/25'}
                    `}
                    onClick={() => setSelectedSceneIndex(index)}
                  >
                    <div className="aspect-video relative">
                      <img
                        src={scene.preview}
                        alt={scene.name}
                        className="w-full h-full object-cover"
                        onError={e => {
                          console.error('Error loading scene preview:', e);
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={e => {
                            e.stopPropagation();
                            setViews(prev => {
                              const copy = [...prev];
                              const view = copy[selectedViewIndex];
                              if (view) {
                                view.scenes = view.scenes.filter((_, i) => i !== index);
                                if (selectedSceneIndex >= view.scenes.length) {
                                  setSelectedSceneIndex(Math.max(0, view.scenes.length - 1));
                                }
                              }
                              return copy;
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-2 bg-background">
                      <div className="font-medium text-sm truncate">{scene.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {scene.hotspots.length} hotspots
                      </div>
                    </div>
                  </div>
            ))}
          </div>

          {/* 360° Preview */}
          {scenes[selectedSceneIndex] && (
            <div className="space-y-3">
              <Label>360° Preview - {scenes[selectedSceneIndex].name}</Label>
              <div className="border rounded-lg bg-black relative">
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={360}
                  onClick={handleCanvasClick}
                  onPointerUp={handleCanvasPointerUp}
                  className="w-full h-48 rounded-lg cursor-crosshair"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedSceneIndex(i => Math.max(0, i - 1))}
                    disabled={selectedSceneIndex === 0}
                  >
                    ‹ Prev
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedSceneIndex(i => Math.min(scenes.length - 1, i + 1))}
                    disabled={selectedSceneIndex === scenes.length - 1}
                  >
                    Next ›
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const canvas = canvasRef.current;
                      if (canvas && canvas.requestFullscreen) void canvas.requestFullscreen();
                    }}
                  >
                    Fullscreen
                  </Button>
                </div>
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Click on the preview to add hotspots • Drag to look around
              </div>

              {/* Hotspots Editor */}
              <div className="space-y-2">
                <Label>Hotspots ({scenes[selectedSceneIndex]?.hotspots.length || 0})</Label>
                <div className="border rounded-lg p-3 bg-background">
                  {(scenes[selectedSceneIndex]?.hotspots || []).map(hotspot => (
                    <div
                      key={hotspot.id}
                      className={`flex items-center gap-2 mb-2 p-2 rounded transition-colors ${
                        selectedHotspotId === hotspot.id
                          ? 'bg-primary/10 border border-primary/20'
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-muted rounded">
                        <DynamicIcon name={(hotspot.icon || 'pin') as any} className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <Input
                          value={hotspot.title || ''}
                          onChange={e => {
                            const val = e.target.value;
                            setScenes(prev => {
                              const copy = [...prev];
                              const scene = copy[selectedSceneIndex];
                              if (!scene) return prev;
                              scene.hotspots = scene.hotspots.map(h =>
                                h.id === hotspot.id ? { ...h, title: val } : h
                              );
                              return copy;
                            });
                          }}
                          placeholder="Hotspot title"
                          className="text-sm"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setScenes(prev => {
                            const copy = [...prev];
                            const scene = copy[selectedSceneIndex];
                            if (!scene) return prev;
                            scene.hotspots = scene.hotspots.filter(h => h.id !== hotspot.id);
                            return copy;
                          });
                          if (selectedHotspotId === hotspot.id) {
                            setSelectedHotspotId(null);
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  {(!scenes[selectedSceneIndex]?.hotspots || scenes[selectedSceneIndex]?.hotspots.length === 0) && (
                    <div className="text-xs text-muted-foreground text-center py-4">
                      No hotspots yet. Click on the 360° preview above to add hotspots.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
