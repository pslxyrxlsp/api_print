
function __printPdf__(url) {
  let iframe = document.getElementById('printIframe');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'printIframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }
  iframe.onload = function () {
    setTimeout(() => {
      iframe.focus();
      iframe.contentWindow.print();
    }, 100); // Delay ensures PDF is fully loaded
  };
  iframe.src = url;
}

function __printApiPdf__(urlApi) {
  fetch(urlApi)
    .then(response => response.blob())
    .then(blob => __blobToArrayBuffer__(blob))
    .then(arrayBuffer => __createIframeSourceURL__(arrayBuffer))    
    .catch(error => console.error('Error fetching PDF:', error));
}

function __blobToArrayBuffer__(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
    });
}

function __createIframeSourceURL__(arrayBuffer) {
    var blobUrl = URL.createObjectURL(new Blob([arrayBuffer], { type: 'application/pdf' }));
    __setPDFSrcInIframe__(blobUrl);
}

function __setPDFSrcInIframe__(url) {
    var iframe = document.getElementById('pdfIframe'); // Replace with your actual iframe ID or selection method.
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'printIframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }
    iframe.onload = function () {
      setTimeout(() => {
        iframe.focus();
        iframe.contentWindow.print();
      }, 100); // Delay ensures PDF is fully loaded
    };
    iframe.src = url;
}

export  { __printApiPdf__ ,__printPdf__  };
