(function() {
  /*
  // Variables
  */
  var $container = createNotifyContainer();

  /*
  // Methods
  */
  function init() {
    // Add container to hold notify item
    document.body.append($container);

    window.notify = notify;
  }

  function notify(options) {
    if (!isOptionsValid(options)) return;

    var $item = createNotifyItem(
      options.message || "",
      options.color || "default"
    );

    if (options.timeout) {
      setAutocloseTimeout($item, options.timeout);
    }

    $container.append($item);
  }

  function createNotifyContainer() {
    var $container = document.createElement("div");
    $container.className = "notify-container";

    return $container;
  }

  function createNotifyItem(message, color) {
    var $item = document.createElement("div");
    $item.classList.add("notify-item");
    $item.classList.add("shadow-md");
    
    var $flex = document.createElement("div");
    $flex.className = "flex items-center";
    
    var $icon = getIcon(color);
    $flex.append($icon);
    var $message = getMessage(message);
    $flex.append($message);
    var $closeBtn = getCloseIcon();
    $flex.append($closeBtn);
    
    $item.append($flex);

    return $item;
  }
  
  function getIcon(type) {
    var $icon = document.createElement("div");
    $icon.className = "py-1";
    
    var $svg = "";
    switch(type){
      case "success":
        $svg = `<svg class="fill-current h-6 w-6 text-green-400 mr-4" aria-hidden="true" focusable="false" data-prefix="far" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path></svg>`
        break;
      case "danger":
        $svg = `<svg class="fill-current h-6 w-6 text-red-500 mr-4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>`
        break;
      default:
        $svg = `<svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>`
        break;
    }
    $icon.innerHTML = $svg;
    
    return $icon;
  }
  
  function getMessage(message) {
    var $messageBox = document.createElement("p");
    $messageBox.className = "font-bold";
    $messageBox.innerHTML = message;
    
    return $messageBox;
  }
  
  function getCloseIcon() {
    var $close = document.createElement("span");
    $close.className = "ml-3"
    $close.innerHTML = `<svg class="fill-current h-4 w-4 text-gray-300" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>`
    
    setCloseOnClick($close);
    
    return $close;
  }

  function setCloseOnClick($el) {
    $el.addEventListener("click", function() {
      $item.remove();
    });
  }

  function setAutocloseTimeout($el, timeout) {
    setTimeout(function() {
      $el.remove();
    }, timeout);
  }

  function isOptionsValid(options) {
    return (
      options ||
      console.error('usage: \n notify({ message: "OK", color: "success", timeout: 3000 })')
    );
  }

  /*
  // Init
  */

  init();
})();
