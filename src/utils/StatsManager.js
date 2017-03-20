import Project from '../models/Project';
import TagStore from '../stores/TagStore';
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
    StatusConstants.status.forEach(function(status){
      map.set(status, Project.projectsByStatus(projects,status));
    });
    return map;
  }

}

