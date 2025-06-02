import Dashboard from "./Dashboard";

export default function DynamicDashboard({
  selectedView,
}: {
  selectedView: "malloySamples" | "singleEmbed" | "dynamicDashboard";
}) {
  return (
    <Dashboard
      selectedView={selectedView}
      storageKey="my-dashboard-widgets"
      defaultWidgets={[]}
    />
  );
}
