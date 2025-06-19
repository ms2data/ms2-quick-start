export function parseQueryResultString(str: string): {
  server: string;
  projectName: string;
  packageName: string;
  modelPath: string;
  query: string;
} | null {
  try {
    const server = str.match(/server="([^"]+)"/)?.[1];
    const projectName = str.match(/projectName="([^"]+)"/)?.[1];
    const packageName = str.match(/packageName="([^"]+)"/)?.[1];
    const modelPath = str.match(/modelPath="([^"]+)"/)?.[1];

    // Match query=" ... " OR query="..." with multiline content
    const queryMatch =
      str.match(/query=["|`]{1}([\s\S]*?)["|`]{1}\s*\/?>/) ??
      str.match(/query={(["|`]{1}[\s\S]*?["|`]{1})\s*}\/?>/);

    let query = queryMatch?.[1]?.trim();

    // Cleanup leading/trailing quotes or backticks
    if (query?.startsWith('"') || query?.startsWith("`")) {
      query = query.slice(1);
    }
    if (query?.endsWith('"') || query?.endsWith("`")) {
      query = query.slice(0, -1);
    }

    if (!server || !projectName || !packageName || !modelPath || !query) {
      return null;
    }

    return { server, projectName, packageName, modelPath, query };
  } catch {
    return null;
  }
}
