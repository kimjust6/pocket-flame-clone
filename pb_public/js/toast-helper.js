(function () {
    function withToastHelpers(target) {
        if (!target || typeof target !== 'object') return target;

        if (!Array.isArray(target.toasts)) {
            target.toasts = [];
        }

        if (typeof target.toastCounter !== 'number') {
            target.toastCounter = 0;
        }

        target.showToast = function (message, type, timeout) {
            const toastType = type || 'info';
            const toastTimeout = typeof timeout === 'number' ? timeout : 3500;
            const id = ++this.toastCounter;
            this.toasts.push({ id: id, message: message, type: toastType });

            if (toastTimeout > 0) {
                setTimeout(() => this.removeToast(id), toastTimeout);
            }
        };

        target.removeToast = function (id) {
            this.toasts = this.toasts.filter((toast) => toast.id !== id);
        };

        target.toastAlertClass = function (type) {
            if (type === 'success') return 'alert-success';
            if (type === 'warning') return 'alert-warning';
            if (type === 'error') return 'alert-error';
            return 'alert-info';
        };

        return target;
    }

    window.withToastHelpers = withToastHelpers;
})();
