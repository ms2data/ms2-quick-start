# Embedded Data Apps (React SDK)

MS2 makes it easy to embed governed analytics into your web applications—directly from your semantic models and notebooks. The SDK lets you drop live visualizations, metrics, or full analyses into your product with just a few lines of code.

### Try the Sample App

1. Open the `sample_data_app` folder included in the Quick Start repo.
2. Run the following commands to start the app:

   ```bash
   cd sample_data_app
   npm install
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.  
   You should see a placeholder dashboard with some fake charts.

> 🔐 **Note:** If you’re not already logged into MS2, the app may prompt you to sign in before embedded content loads.

### Embed a Published Analysis

You can embed any analysis cell from your published Malloy notebook directly into the app.

1. In your notebook on the MS2 platform, find the analysis block you want to embed.
2. Click the **“Embed”** button in the **MS2 toolbar** for that block.
3. Copy the embed code provided in the dialog.

### Add the Embed to Your App

1. Open `Dashboard.tsx` inside the `sample_data_app` project.
2. Replace the `<MainGrid />` placeholder with your copied embed code.

   For example:

   ```tsx
   // TODO: Add correct embed code here

   import { CredibleEmbed } from "@credible/sdk";

   export default function Dashboard() {
     return (
       <div className="dashboard">
         <CredibleEmbed
           notebook="sales_performance"
           block="top_products_by_revenue"
         />
       </div>
     );
   }
   ```

3. Save the file and refresh your browser.  
   You should now see live, governed analytics served directly from your semantic model.

> ✅ Great for building internal tools, customer-facing dashboards, or any UI that needs trustworthy data experiences.

> 🔁 You can reuse this pattern to embed multiple notebook blocks, semantic model views, or even full interactive dashboards—all powered by a single semantic definition.
