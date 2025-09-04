import React, { useState, useEffect } from 'react';

// Define the type for the test results
interface SpeedTestResults {
  download: number;
  upload: number;
  ping: number;
}

// Define the type for network information
interface NetworkInfo {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

// Define the NetworkInformation interface
interface NetworkInformation {
  effectiveType: string;
  downlink: number;
  rtt: number;
}

const SpeedTest: React.FC = () => {
  const [results, setResults] = useState<SpeedTestResults | null>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startTest = () => {
    setIsTesting(true);
    setError(null);
    setResults(null);

    // Use the Web Workers API to run the test in a separate thread
    const worker = new Worker('/speedTestWorker.js');

    worker.onmessage = (e) => {
      if (e.data.type === 'result') {
        setResults(e.data.value);
        setIsTesting(false);
        worker.terminate();
      } else if (e.data.type === 'error') {
        setError(e.data.value);
        setIsTesting(false);
        worker.terminate();
      }
    };

    worker.postMessage({ type: 'start' });
  };

  // Get network information if available
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = navigator.connection as NetworkInformation;
      setNetworkInfo({
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
      });
    }
  }, []);

  return (
    <section className="speed-test" id="speed-test">
      <div className="container">
        <h2>Test Your Speed</h2>
        <p className="section-subtitle">See how fast your connection really is.</p>
        
        <div className="speed-test-container">
          <div className="test-button-container">
            <button
              className={`btn btn-primary ${isTesting ? 'testing' : ''}`}
              onClick={startTest}
              disabled={isTesting}
            >
              {isTesting ? 'Testing...' : 'Start Speed Test'}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="speed-test-results">
            <div className="result-card">
              <h3>Download Speed</h3>
              <div className="speed-value">
                {results ? `${results.download.toFixed(2)} Mbps` : '--'}
              </div>
              <div className="speed-bar-container">
                <div className="speed-bar" style={{ width: `${results ? Math.min(results.download, 100) : 0}%` }}></div>
              </div>
            </div>

            <div className="result-card">
              <h3>Upload Speed</h3>
              <div className="speed-value">
                {results ? `${results.upload.toFixed(2)} Mbps` : '--'}
              </div>
              <div className="speed-bar-container">
                <div className="speed-bar" style={{ width: `${results ? Math.min(results.upload, 100) : 0}%` }}></div>
              </div>
            </div>

            <div className="result-card">
              <h3>Ping</h3>
              <div className="speed-value">
                {results ? `${results.ping} ms` : '--'}
              </div>
              <div className="ping-indicator"></div>
            </div>
          </div>

          {networkInfo && (
            <div className="network-info">
              <h4>Network Information</h4>
              <p>Effective Type: {networkInfo.effectiveType}</p>
              <p>Estimated Downlink: {networkInfo.downlink} Mbps</p>
              <p>Round-trip time: {networkInfo.rtt} ms</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SpeedTest;