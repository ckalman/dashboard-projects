import Project from '../models/Project';
import TagStore from '../stores/TagStore';
import UserStore from '../stores/UserStore';
import StatusConstants from '../constants/StatusConstants';


export default class StatsManager {

  static tagsStats(projects) {
    var map = new Map();
    TagStore.getTags().forEach(function(tag){
      map.set(tag, Project.projectsByTag(projects,tag));
    });
    return map;
  }

  static statusStats(projects) {
    var map = new Map();
    projects.forEach(function(project){
      var nb = map.get(project.status);
      if (!nb){nb=0;}
      map.set(project.status, nb+1);
    });
    return map;
  }

  static projectManagerStats(projects) {
    var map = new Map();
    projects.forEach(function(project){
      var nb = map.get(project.projectManager.username);
      if (!nb){nb=0;}
      map.set(project.projectManager.username, nb+1);
    });
    return map;
  }

}

