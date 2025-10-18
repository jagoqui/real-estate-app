/* eslint-disable max-lines-per-function */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DynamicIcon } from '@/modules/shared/infrastructure/ui/react/components/dynamicIcon/dynamicIcon';
import { ChevronLeft, ChevronRight, Plus, RotateCcw, Trash2, Upload } from 'lucide-react';
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
  const [isFileDragging, setIsFileDragging] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);
  const controlsRef = useRef({ lat: 0, lon: 0, fov: 75 });
  const lastClickTimeRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Constants
  const SPHERE_RADIUS = 500;
  const CAMERA_FOV = 75;
  const CAMERA_NEAR = 0.1;
  const CAMERA_FAR = 1000;
  const CAMERA_INITIAL_Z = 0.1;
  const SPHERE_WIDTH_SEGMENTS = 60;
  const SPHERE_HEIGHT_SEGMENTS = 40;
  const POLAR_OFFSET = 90;
  const RANDOM_BASE = 36;
  const RANDOM_START = 2;
  const RANDOM_LENGTH = 9;
  const WHITE_COLOR = 0xffffff;
  const GRAY_COLOR = 0x808080;
  const FALLBACK_COLOR = 0x404040;
  const HOTSPOT_DELAY = 100;
  const MOUSE_SENSITIVITY = 0.2;
  const ZOOM_SENSITIVITY = 0.05;
  const MIN_LAT = -85;
  const MAX_LAT = 85;
  const MIN_FOV = 10;
  const MAX_FOV = 120;

  // Initialize with external value only once
  const isInitializedRef = useRef(false);
  const previousViewsRef = useRef<Array<View360>>([]);

  useEffect(() => {
    if (!isInitializedRef.current && value && value.length > 0) {
      setViews(value);
      previousViewsRef.current = value;
      isInitializedRef.current = true;
    }
  }, [value]);

  // Report changes back to parent (but not on initial load)
  useEffect(() => {
    if (isInitializedRef.current && views !== previousViewsRef.current) {
      previousViewsRef.current = views;
      onChange?.(views);
    }
  }, [views, onChange]);

  // Get current view and scene
  const currentView = views[selectedViewIndex];
  const currentScene = currentView?.scenes[selectedSceneIndex];

  // Mouse controls
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  // Initialize Three.js
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('🚨 Canvas ref not available, skipping Three.js initialization');
      return;
    }
    console.info('🎬 Initializing Three.js scene...');

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 1.0); // Black background initially
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      canvas.clientWidth / canvas.clientHeight,
      CAMERA_NEAR,
      CAMERA_FAR
    );
    camera.position.set(0, 0, CAMERA_INITIAL_Z);
    cameraRef.current = camera;

    const geometry = new THREE.SphereGeometry(SPHERE_RADIUS, SPHERE_WIDTH_SEGMENTS, SPHERE_HEIGHT_SEGMENTS);
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      color: GRAY_COLOR, // Gray initially
      side: THREE.BackSide,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.name = 'panorama-sphere';
    scene.add(sphere);

    // Mouse controls for navigation
    const handleMouseDown = (event: MouseEvent): void => {
      if (viewMode === 'navigate') {
        isDragging.current = true;
        previousMousePosition.current = { x: event.clientX, y: event.clientY };
        canvas.style.cursor = 'grabbing';
      }
    };

    const handleMouseMove = (event: MouseEvent): void => {
      if (!isDragging.current || viewMode !== 'navigate') return;

      const deltaX = event.clientX - previousMousePosition.current.x;
      const deltaY = event.clientY - previousMousePosition.current.y;

      controlsRef.current.lon -= deltaX * MOUSE_SENSITIVITY;
      controlsRef.current.lat += deltaY * MOUSE_SENSITIVITY;

      // Clamp latitude
      controlsRef.current.lat = Math.max(MIN_LAT, Math.min(MAX_LAT, controlsRef.current.lat));

      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = (): void => {
      isDragging.current = false;
      canvas.style.cursor = viewMode === 'navigate' ? 'grab' : 'crosshair';
    };

    const handleWheel = (event: WheelEvent): void => {
      event.preventDefault();
      controlsRef.current.fov += event.deltaY * ZOOM_SENSITIVITY;
      controlsRef.current.fov = Math.max(MIN_FOV, Math.min(MAX_FOV, controlsRef.current.fov));
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);

    const animate = (): void => {
      requestAnimationFrame(animate);
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
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [viewMode, MIN_LAT]);

  // Load texture when current scene changes
  useEffect(() => {
    if (!currentScene || !sceneRef.current || !rendererRef.current) return;

    const sphere = sceneRef.current.getObjectByName('panorama-sphere') as THREE.Mesh;
    if (!sphere) return;

    const material = sphere.material as THREE.MeshBasicMaterial;

    console.info('🔄 Loading texture for scene:', currentScene.name);

    // Clean up previous texture
    if (textureRef.current) {
      textureRef.current.dispose();
      textureRef.current = null;
    }

    // Reset material to show loading state
    material.map = null;
    material.color.setHex(GRAY_COLOR);
    material.needsUpdate = true;

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    loader.load(
      currentScene.preview,
      texture => {
        console.info('✅ Texture loaded successfully for scene:', currentScene.name);

        // Configure texture for panoramic display
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.flipY = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        textureRef.current = texture;
        material.map = texture;
        material.color.setHex(WHITE_COLOR); // Set to white for proper texture display
        material.needsUpdate = true;

        // Force a render to show the texture immediately
        if (rendererRef.current && cameraRef.current && sceneRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      },
      progress => {
        if (progress.total > 0) {
          const percent = ((progress.loaded / progress.total) * 100).toFixed(1);
          console.info('📊 Loading progress:', percent + '%');
        }
      },
      error => {
        console.error('❌ Error loading texture for scene:', currentScene.name, error);
        console.error('URL length:', currentScene.preview.length);
        console.error('URL preview:', currentScene.preview.substring(0, 50) + '...');

        material.color.setHex(FALLBACK_COLOR);
        material.map = null;
        material.needsUpdate = true;

        // Force render to show fallback
        if (rendererRef.current && cameraRef.current && sceneRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      }
    );
  }, [currentScene]);

  // Handle canvas click for adding hotspots
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    if (viewMode !== 'add-hotspot' || !currentScene) return;

    const now = Date.now();
    if (now - lastClickTimeRef.current < HOTSPOT_DELAY) return;
    lastClickTimeRef.current = now;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const u = x / rect.width;
    const v = y / rect.height;

    if (u < 0 || u > 1 || v < 0 || v > 1) return;

    const newHotspot: Hotspot = {
      id: `hotspot-${Date.now()}-${Math.random().toString(RANDOM_BASE).substr(RANDOM_START, RANDOM_LENGTH)}`,
      u,
      v,
      title: 'New hotspot',
      description: '',
      icon: 'pin',
    };

    setViews(prev => {
      const copy = [...prev];
      const view = copy[selectedViewIndex];
      if (view) {
        const scene = view.scenes[selectedSceneIndex];
        if (scene) {
          scene.hotspots = [...scene.hotspots, newHotspot];
        }
      }
      return copy;
    });
  };

  // Add new view
  const handleAddView = (): void => {
    const newView: View360 = {
      id: Date.now().toString(),
      name: `View ${views.length + 1}`,
      scenes: [],
    };

    setViews(prev => [...prev, newView]);
    setSelectedViewIndex(views.length);
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
            id: Date.now().toString() + Math.random().toString(RANDOM_BASE).substr(RANDOM_START, RANDOM_LENGTH),
            name: file.name.replace(/\.[^/.]+$/, ''),
            preview: reader.result as string,
            file: { id: Date.now().toString(), file, name: file.name, size: file.size },
            hotspots: [],
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

  // File drag handlers
  const handleFileDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsFileDragging(true);
  };

  const handleFileDragLeave = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsFileDragging(false);
  };

  const handleFileDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsFileDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleAddScenes(files);
    }
  };

  // Fullscreen handlers
  const handleFullscreenToggle = (): void => {
    const container = canvasContainerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        void container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        void document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = (): void => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">360° Virtual Tours</Label>
        <Button type="button" onClick={handleAddView} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add New View
        </Button>
      </div>

      {/* Views Navigation */}
      {views.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {views.map((view, index) => (
            <Button
              key={view.id}
              type="button"
              variant={index === selectedViewIndex ? 'default' : 'outline'}
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
      {currentView ? (
        <div className="space-y-4">
          {/* View Controls */}
          <div className="flex items-center gap-2">
            <Input
              value={currentView.name}
              onChange={e => {
                const newName = e.target.value;
                setViews(prev => {
                  const copy = [...prev];
                  if (copy[selectedViewIndex]) {
                    copy[selectedViewIndex].name = newName;
                  }
                  return copy;
                });
              }}
              className="font-medium flex-1"
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
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Upload Area */}
          <div
            className={`
              border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
              ${isFileDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
              hover:border-primary hover:bg-primary/5
            `}
            onDrop={handleFileDrop}
            onDragOver={handleFileDragOver}
            onDragLeave={handleFileDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">Add scenes to "{currentView.name}"</span>
              </div>
              <div className="text-xs text-muted-foreground">Drop panoramic images here or click to browse</div>
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

          {/* Scenes Grid */}
          {currentView.scenes.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Scenes ({currentView.scenes.length})</Label>
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
                      <img src={scene.preview} alt={scene.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={e => {
                            e.stopPropagation();
                            setViews(prev => {
                              const copy = [...prev];
                              if (copy[selectedViewIndex]) {
                                copy[selectedViewIndex].scenes = copy[selectedViewIndex].scenes.filter(
                                  (_, i) => i !== index
                                );
                                if (selectedSceneIndex >= copy[selectedViewIndex].scenes.length) {
                                  setSelectedSceneIndex(Math.max(0, copy[selectedViewIndex].scenes.length - 1));
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
                      <div className="text-xs text-muted-foreground">{scene.hotspots.length} hotspots</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 360° Preview */}
              {currentScene && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>360° Preview - {currentScene.name}</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedViewIndex(i => Math.max(0, i - 1))}
                        disabled={selectedViewIndex === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Prev View
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedViewIndex(i => Math.min(views.length - 1, i + 1))}
                        disabled={selectedViewIndex === views.length - 1}
                      >
                        Next View
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div
                    ref={canvasContainerRef}
                    className={`border rounded-lg bg-black relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}
                  >
                    <canvas
                      ref={canvasRef}
                      width={640}
                      height={360}
                      onClick={handleCanvasClick}
                      className={`rounded-lg ${isFullscreen ? 'w-full h-full' : 'w-full h-64'} ${viewMode === 'add-hotspot' ? 'cursor-crosshair' : 'cursor-grab'}`}
                    />

                    {/* Scene Navigation */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedSceneIndex(i => Math.max(0, i - 1))}
                        disabled={selectedSceneIndex === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="bg-black/75 text-white px-3 py-1 rounded text-sm">
                        {selectedSceneIndex + 1} / {currentView.scenes.length}
                      </div>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedSceneIndex(i => Math.min(currentView.scenes.length - 1, i + 1))}
                        disabled={selectedSceneIndex === currentView.scenes.length - 1}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Control Panel */}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          controlsRef.current = { lat: 0, lon: 0, fov: 75 };
                        }}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="secondary" size="sm" onClick={handleFullscreenToggle}>
                        {isFullscreen ? 'Exit' : 'Fullscreen'}
                      </Button>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    {viewMode === 'navigate'
                      ? 'Navigate: Use mouse to look around • Use scene controls to navigate between scenes'
                      : 'Add Hotspot Mode: Click on the preview to add hotspots at specific locations'}
                  </div>

                  {/* Hotspots Editor */}
                  {viewMode === 'add-hotspot' && (
                    <div className="space-y-2">
                      <Label>Hotspots ({currentScene.hotspots.length})</Label>
                      <div className="border rounded-lg p-3 bg-background max-h-60 overflow-y-auto">
                        {currentScene.hotspots.map(hotspot => (
                          <div key={hotspot.id} className="flex items-center gap-2 mb-2 p-2 rounded hover:bg-muted/50">
                            <div className="w-8 h-8 flex items-center justify-center bg-muted rounded">
                              <DynamicIcon name={hotspot.icon || 'pin'} className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <Input
                                value={hotspot.title || ''}
                                onChange={e => {
                                  const val = e.target.value;
                                  setViews(prev => {
                                    const copy = [...prev];
                                    if (copy[selectedViewIndex]?.scenes[selectedSceneIndex]) {
                                      copy[selectedViewIndex].scenes[selectedSceneIndex].hotspots = copy[
                                        selectedViewIndex
                                      ].scenes[selectedSceneIndex].hotspots.map(h =>
                                        h.id === hotspot.id ? { ...h, title: val } : h
                                      );
                                    }
                                    return copy;
                                  });
                                }}
                                placeholder="Hotspot title"
                                className="text-sm"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setViews(prev => {
                                  const copy = [...prev];
                                  if (copy[selectedViewIndex]?.scenes[selectedSceneIndex]) {
                                    copy[selectedViewIndex].scenes[selectedSceneIndex].hotspots = copy[
                                      selectedViewIndex
                                    ].scenes[selectedSceneIndex].hotspots.filter(h => h.id !== hotspot.id);
                                  }
                                  return copy;
                                });
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                        {currentScene.hotspots.length === 0 && (
                          <div className="text-center text-muted-foreground py-4">
                            No hotspots yet. Click on the 360° preview to add some.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 text-muted-foreground">
          <div className="text-lg font-medium mb-2">No 360° views yet</div>
          <div className="text-sm mb-4">Create your first virtual tour by adding a new view</div>
          <Button type="button" onClick={handleAddView}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First View
          </Button>
        </div>
      )}
    </div>
  );
};
