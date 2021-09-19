const apiKey = "4c404d3d1fcc49749412a0a2b2e62832";
const url = "https://api.rebrandly.com/v1/links";

const myInput = document.getElementById('urlInput');
const responseField = document.querySelector('.result');
const shortenButton = document.getElementById('submitURL');

const shortenUrl = () => {
    const UrlToShorten = myInput.value;
    const data = JSON.stringify({destination: UrlToShorten});

    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE) {
            renderResponse(xhr.response);
        }
    }
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('apikey', apiKey);
    xhr.send(data);
}

const renderResponse = (res) => {
    if(res.errors){
      // Will change the HTML to show this error message if the response had an error
      responseField.innerHTML = "<p>Sorry, couldn't format your URL. Try again.</p>";
    } else {
      // If there was no error, then the HTML will show this message
      responseField.innerHTML = `<p> ${res.shortUrl} </p>`;
    }
}

const displayShortUrl = (event) => {
    while(responseField.firstChild){
        event.preventDefault();
      responseField.removeChild(responseField.firstChild);
    };
    shortenUrl();
};

shortenButton.addEventListener('click', displayShortUrl);

// function copy_data(id) {
//     var range = document.createRange();
//     range.selectNode(id); //changed here
//     window.getSelection().removeAllRanges(); 
//     window.getSelection().addRange(range); 
//     document.execCommand("copy");
//     window.getSelection().removeAllRanges();
//     alert("data copied");
//   }