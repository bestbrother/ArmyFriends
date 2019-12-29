import PostStore from './PostStore';
import UserStore from './UserStore';
import UploadStore from './UploadStore';
import JobStore from './JobStore';
import MyStore from './MyStore';
import PopUpStore from './PopUpStore';
import FindStore from './FindStore';

// admin
import AdminLoginStore from './adminLogin';
import AdminJobStore from './adminJob';
import AdminBoardStore from './adminBoard';
import AdminUserStore from './adminUser';
import AdminFeatureStore from './adminFeature';

class RootStore{
	constructor(){
		this.postStore = new PostStore(this);
		this.userStore = new UserStore(this);
		this.uploadStore = new UploadStore(this);
		this.jobStore = new JobStore(this);
		this.myStore = new MyStore(this);
		this.popUpStore = new PopUpStore(this);
		this.findStore = new FindStore(this);
		
		// admin- Store
		this.adminLoginStore = new AdminLoginStore(this);
		this.adminJobStore = new AdminJobStore(this);
		this.adminBoardStore = new AdminBoardStore(this);
		this.adminUserStore = new AdminUserStore(this);
		this.adminFeatureStore = new AdminFeatureStore(this);
	}
}

export default RootStore;