// Unique ID for the className.
var MOUSE_VISITED_CLASSNAME = 'crx_mouse_visited';

// Previous dom, that we want to track, so we can remove the previous styling.
var prevDOM = null;

// Mouse listener for any move event on the current document.
document.addEventListener('mousemove', function (e) {
  var x = e.clientX,
      y = e.clientY;

  var srcElement = elementFromPoint(x, y);

  // Lets check if our underlying element is a DIV.
  if (true) {

    // For NPE checking, we check safely. We need to remove the class name
    // Since we will be styling the new one after.
    if (prevDOM != null) {
      prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
    }

    // Add a visited class name to the element. So we can style it.
    srcElement.classList.add(MOUSE_VISITED_CLASSNAME);

    // The current element is now the previous. So we can remove the class
    // during the next iteration.
    prevDOM = srcElement;
  }
}, false);

document.addEventListener('click', logInner);
// document.removeEventListener('click', logInner);

function logInner(e) {
    var x = e.clientX,
      y = e.clientY;

  var srcElement = elementFromPoint(x, y);

  console.log(srcElement.innerHTML);
  e.stopPropagation();
  e.preventDefault();
}

var tagBlacklist = ['IMG'];

function elementFromPoint(x, y) {
  // http://stackoverflow.com/questions/21051084/javascript-know-all-the-elements-under-your-mouse-pointer-multiple-z-axis-laye
  var /*x = e.clientX,
        y = e.clientY,*/
        // stack = [],
        elementMouseIsOver = document.elementFromPoint(x, y);

    // stack.push(elementMouseIsOver);

    // console.log("tagName: " + elementMouseIsOver.tagName);

    while (tagBlacklist.includes(elementMouseIsOver.tagName)){

        elementMouseIsOver.style.pointerEvents = 'none';
        elementMouseIsOver = document.elementFromPoint(x, y);

        // stack.push(elementMouseIsOver);
    }

    /* Now clean it up */
    // var i  = 0,
    //     il = stack.length;

    // for (; i < il; i += 1) {
    //     stack[i].style.pointerEvents = '';
    // }

    // console.log(stack);

    return elementMouseIsOver;
}