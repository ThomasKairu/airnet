let downloadSize = 50; // MB - Increased for more accurate measurement
let uploadSize = 10; // MB - Increased for more accurate measurement
let pingCount = 10; // Increased ping count for better accuracy
let downloadSpeed = 0;
let uploadSpeed = 0;
let ping = 0;
let progress = 0;

self.onmessage = function(e) {
  if (e.data.type === 'start') {
    runSpeedTest();
  }
};

function runSpeedTest() {
  // Add timeout to prevent hanging tests
  const testTimeout = setTimeout(() => {
    self.postMessage({ type: 'error', value: 'Speed test timed out. Please try again.' });
  }, 30000); // 30 second timeout

  // Run tests in sequence for more accurate results
  measurePing()
    .then(() => {
      clearTimeout(testTimeout);
      // Small delay between tests
      return new Promise(resolve => setTimeout(resolve, 1000));
    })
    .then(() => measureDownloadSpeed())
    .then(() => {
      // Small delay between tests
      return new Promise(resolve => setTimeout(resolve, 1000));
    })
    .then(() => measureUploadSpeed())
    .catch(err => {
      clearTimeout(testTimeout);
      self.postMessage({ type: 'error', value: 'Speed test failed: ' + err.message });
    });
}

function measurePing() {
  const url = 'https://www.google.com';
  const pingPromises = [];
  
  for (let i = 0; i < pingCount; i++) {
    pingPromises.push(new Promise((resolve, reject) => {
      const startTime = performance.now();
      const img = new Image();
      
      img.onload = () => {
        const endTime = performance.now();
        resolve(endTime - startTime);
      };
      
      img.onerror = () => {
        reject(new Error('Ping test failed'));
      };
      
      // Use cache-busting parameter
      img.src = `${url}?t=${Date.now()}-${i}`;
    }));
  }
  
  Promise.all(pingPromises)
    .then(pings => {
      // Remove highest and lowest values for better accuracy
      const sortedPings = pings.sort((a, b) => a - b);
      const filteredPings = sortedPings.slice(1, -1);
      ping = filteredPings.reduce((a, b) => a + b, 0) / filteredPings.length;
      self.postMessage({ type: 'result', value: { download: downloadSpeed, upload: uploadSpeed, ping: Math.round(ping) } });
    })
    .catch(err => {
      self.postMessage({ type: 'error', value: 'Failed to measure ping.' });
    });
}

function measureDownloadSpeed() {
  // Use multiple large files for better accuracy
  const testUrls = [
    'https://speed.cloudflare.com/__downloader?bytes=10485760', // 10MB
    'https://speed.cloudflare.com/__downloader?bytes=10485760', // 10MB
    'https://speed.cloudflare.com/__downloader?bytes=10485760', // 10MB
    'https://speed.cloudflare.com/__downloader?bytes=10485760', // 10MB
    'https://speed.cloudflare.com/__downloader?bytes=10485760'  // 10MB
  ];
  
  const startTime = performance.now();
  let totalBytesDownloaded = 0;
  let completedRequests = 0;
  let failedRequests = 0;

  const downloadFile = (url) => {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then(buffer => {
        totalBytesDownloaded += buffer.byteLength;
        completedRequests++;
        progress = (totalBytesDownloaded / (downloadSize * 1024 * 1024)) * 100;
        self.postMessage({ type: 'progress', value: progress });

        if (completedRequests + failedRequests === testUrls.length) {
          const endTime = performance.now();
          const durationSeconds = (endTime - startTime) / 1000;
          downloadSpeed = (totalBytesDownloaded / 1024 / 1024) / durationSeconds;
          
          if (uploadSpeed > 0 && ping > 0) {
            self.postMessage({ type: 'result', value: { download: downloadSpeed, upload: uploadSpeed, ping: ping } });
          }
        }
      })
      .catch(err => {
        failedRequests++;
        console.error('Download failed:', err);
        if (completedRequests + failedRequests === testUrls.length) {
          const endTime = performance.now();
          const durationSeconds = (endTime - startTime) / 1000;
          downloadSpeed = (totalBytesDownloaded / 1024 / 1024) / durationSeconds;
          
          if (uploadSpeed > 0 && ping > 0) {
            self.postMessage({ type: 'result', value: { download: downloadSpeed, upload: uploadSpeed, ping: ping } });
          }
        }
      });
  };

  // Start all downloads in parallel
  testUrls.forEach(url => downloadFile(url));
}

function measureUploadSpeed() {
  // Use a more reliable endpoint for upload testing
  const uploadUrl = 'https://speed.cloudflare.com/__uploadee';
  
  // Create test data with binary content for better simulation
  const testData = new Uint8Array(uploadSize * 1024 * 1024);
  for (let i = 0; i < testData.length; i++) {
    testData[i] = Math.floor(Math.random() * 256); // Random byte values
  }
  
  const uploadBlob = new Blob([testData]);
  const startTime = performance.now();
  
  // Use XMLHttpRequest for better progress tracking
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.open('POST', uploadUrl, true);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const endTime = performance.now();
        const durationSeconds = (endTime - startTime) / 1000;
        uploadSpeed = (uploadSize / durationSeconds);
        
        if (downloadSpeed > 0 && ping > 0) {
          self.postMessage({ type: 'result', value: { download: downloadSpeed, upload: uploadSpeed, ping: ping } });
        }
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };
    
    xhr.onerror = () => {
      reject(new Error('Upload request failed'));
    };
    
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        progress = 50 + (event.loaded / event.total) * 50; // Start from 50% since download is first
        self.postMessage({ type: 'progress', value: progress });
      }
    };
    
    xhr.send(uploadBlob);
  }).catch(err => {
    self.postMessage({ type: 'error', value: 'Failed to measure upload speed.' });
  });
}