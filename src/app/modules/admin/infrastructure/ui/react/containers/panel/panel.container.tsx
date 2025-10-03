import { PanelBodyContainer } from '../panelBody/panelBody.container';

export const PanelContainer = (): React.ReactElement => {
  return (
    <section className="flex h-full w-full flex-col p-4">
      <h1>Admin Panel</h1>
      <PanelBodyContainer />
    </section>
  );
};
