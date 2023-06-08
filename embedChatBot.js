(function init() {
  const script = document['currentScript'];
  const chatBotId = script.getAttribute('chatbotid');
  const host = script.getAttribute('chatbothost');
  const url = `${host}/chatbot-iframe/${chatBotId}`;
  const showChatSvg =
    '<svg id="closeIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="white" width="24" height="24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg>';

  const hideChatSvg =
    '<svg id="chatIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="white" width="24" height="24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"></path></svg>';
  let showChat = false;

  function switchSvgIcon() {
    const btn = document.getElementById('embed_chat_btn');
    if (btn.hasChildNodes()) {
      btn.innerHTML = '';
    }
    const svgString = showChat ? showChatSvg : hideChatSvg;
    showChat = !showChat;

    const parser = new DOMParser();
    const svgElement = parser
      .parseFromString(svgString, 'image/svg+xml')
      .querySelector('svg');
    btn.appendChild(svgElement);
  }

  function createBtn() {
    var btn = document.createElement('button');
    btn.id = 'embed_chat_btn';
    // var content = document.createTextNode('点击')
    const styles = `position: fixed; border: transparent; bottom: 1rem; right: 1rem; width: 50px; height: 50px; border-radius: 25px; background-color: rgb(0, 0, 0); box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px; cursor: pointer; z-index: 999999998; transition: all 0.2s ease-in-out 0s; left: unset; transform: scale(1); color:white`;
    btn.setAttribute('style', styles);
    // btn.appendChild(content)
    document.body.appendChild(btn);
    switchSvgIcon();
  }

  function createBaseChat() {
    var iframe = document.createElement('iframe');
    // iframe.src = 'https://www.xiaofengai.com/'
    iframe.src = url;
    iframe.id = 'embed_chat';
    const styles = `border: none;
    position: fixed;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px;
    bottom: 5rem;
    right: 1rem;
    width: 448px;
    height: 85vh;
    max-height: 824px;
    border-radius: 0.75rem;
    display: none;
    z-index: 999999999;
    overflow: hidden;
    left: unset;`;
    iframe.setAttribute('style', styles);
    document.body.appendChild(iframe);
  }

  let iframeShow = false;
  function openOrCloseIframe(close = false) {
    const iframe = document.getElementById('embed_chat');
    iframeShow = !close;
    iframe.style.display = close ? 'none' : 'flex';
    switchSvgIcon();
  }

  function initBtnEvent() {
    var btn = document.getElementById('embed_chat_btn');
    btn.addEventListener('click', function (e) {
      openOrCloseIframe(iframeShow);
    });
  }

  function initReceiveMessage() {
    window.addEventListener('message', function (event) {
      if (
        typeof event === 'object' &&
        event?.data?.appName === 'embedChatBot'
      ) {
        const { value } = event.data;
        if (value == 'close') {
          openOrCloseIframe(true);
        }
      }
    });
  }

  createBaseChat();
  createBtn();
  initBtnEvent();
  initReceiveMessage();
})();
