function NotificationService() {
    const _this = this;
    this.permission = Notification.permission;
    this.isAllowed = this.permission == 'granted';

    this.sendNotification = function(text, timeToClose = 2000) {
        var n = new Notification(text);
        n.onshow = function () {
            setTimeout(n.close, timeToClose);
        }
    }

    this.init = function(){
        if(!this.isAllowed){
            Notification.requestPermission(function (status) {
                Notification.permission = status;
                _this.permission = status;
                _this.isAllowed = status == 'granted';
                _this.sendNotification("已成功開啟通知");
            });
        }
    }

    this.init();
}

export default NotificationService;