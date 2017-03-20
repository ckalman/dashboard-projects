export default class StatsManager {

  /**
   * Return a dictionary with the tags stats
   * @param projects
   * @returns {Map}
   */
  static tagsStats(projects) {
    var map = new Map();

    // Parse all projects to get its tags and add each of them into the dictionary
    projects.forEach(function(project){
      project.tags.forEach(function(tag){
        var nb = map.get(tag);
        if (!nb){nb=0;}
        map.set(tag, nb+1);
      });
    });
    return map;
  }

  /**
   * Return a dictionary with the status stats
   * @param projects
   * @returns {Map}
   */
  static statusStats(projects) {
    var map = new Map();

    // Parse all projects to get its status and add it into the dictionary
    projects.forEach(function(project){
      var nb = map.get(project.status);
      if (!nb){nb=0;}
      map.set(project.status, nb+1);
    });
    return map;
  }

  /**
   * Return a dictionary with the project manager stats
   * @param projects
   * @returns {Map}
   */
  static projectManagerStats(projects) {
    var map = new Map();

    // Parse all projects to get its project manager and add it into the dictionary
    projects.forEach(function(project){
      var nb = map.get(project.projectManager.username);
      if (!nb){nb=0;}
      map.set(project.projectManager.username, nb+1);
    });
    return map;
  }

}

