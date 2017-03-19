import Project from '../models/Project';
import TagStore from '../stores/TagStore';


export default class StatsManager {

  static tagsStats(projects) {
    var map = new Map();
    TagStore.getTags().forEach(function(tag){
      map.set(tag, Project.projectsByTag(projects,tag));
    });
    return map;
  }

}

