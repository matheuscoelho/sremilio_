/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.pluginInitialize();
       // socket.init();
    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {

        alert('asd');
    },


    // Initialize plugin
    pluginInitialize: function() {
        // 1) Request background execution
        cordova.plugins.backgroundMode.enable();

        // 2) Now the app runs ins background but stays awake
        cordova.plugins.backgroundMode.on('activate', function () {
            setInterval(function () {
                cordova.plugins.notification.badge.increase();
                alert('teste');
            }, 1000);
        });

        
        // 3) App is back to foreground
        cordova.plugins.backgroundMode.on('deactivate', function () {
            cordova.plugins.notification.badge.clear();
            alert('teste2');
        });
    },

    capturePhoto: function(){

        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.DATA_URL, saveToPhotoAlbum: true });
        
        function onSuccess(imageData) {
            var image = document.getElementById('minhaImagem');
            image.src = "data:image/jpeg;base64," + imageData;
            image.style.display = "block";
        }
        
        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }
/*
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
*/
};

app.initialize();