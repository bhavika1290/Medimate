self.addEventListener("install", () => { 
    self.skipWaiting(); 
})

self.addEventListener("activate", () => { 
    self.clients.claim();
})

self.addEventListener("message", event => { 
    if (event.data && event.data.type === 'show-notification') {
        const { title, body, id } = event.data.payload; 

        event.waitUntil(
            self.ServiceWorkerRegistration.showNotification(title, {
                body: body,
                vibrate: [200, 100, 200],
                tag : `reminder-${id}`
            })
        )
    }
})

self.addEventListener("notificationClick", event => {
    event.notification.close();

    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
            for (const client of clientList) {
                if ("focus" in client) {
                    return client.focus();
                }
            }

            if (self.clients.openWindow) {
                return self.clients.openWindow('/');
            }
        })
    )
})