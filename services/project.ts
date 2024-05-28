import axios from "axios";

export class ProjectData {
  static async GetProjectData(filter?: string) {
    try {
      const response = await axios.get(
        `https://agapengo.com/api/projects?${filter}`
      );
      return response;
    } catch (error) {
      throw new Error(`Error fetching charity projects: ${error}`);
    }
  }
}
