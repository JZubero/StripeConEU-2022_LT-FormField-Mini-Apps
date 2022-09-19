interface StatedHTMLElement extends HTMLElement {
    ready?: boolean;
}

export const watchElement = (selector: string, fn: (el: StatedHTMLElement) => void) => {
    let listeners: {
        selector: string;
        fn: (el: StatedHTMLElement) => void;
    }[] = [];
    const { document: doc, MutationObserver } = window;

    const check = () => {
      for (let i = 0, len = listeners.length, listener, elements; i < len; i += 1) {
        listener = listeners[i];

        // Query for elements matching the specified selector
        elements = doc.querySelectorAll<StatedHTMLElement>(listener.selector);
        for (let j = 0, jLen = elements.length, element; j < jLen; j += 1) {
          element = elements[j];

          // Make sure the callback isn't invoked with the same element more than once
          if (!element.ready) {
            element.ready = true;

            // Invoke the callback with the element
            listener.fn.call(element, element);
          }
        }
      }
    };

    let observer;
    if (!observer) {
      observer = new MutationObserver(check);
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true
      });
    }

    // Register listener for elements targeted by selector param
    listeners = [
        ...listeners,
        {
            selector,
            fn
        }
    ];

    // Trigger first round of checking
    check();
  };

