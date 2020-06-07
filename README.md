# Study of custom React Hooks for persistance

React Hooks are great out of the box for local persistence, which is useful for UI. For program wide state it is usually set aside for other libraries such as Redux, Mobx or Recoil.

This is a study on implementing program wide state with a custom hook. It uses the article <a href='https://medium.com/javascript-in-plain-english/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8#:~:text=Sharing%20states&text=To%20work%20a%20solution%20which,functions%20fired%20and%20get%20updated.'>State Management with React Hooks — No Redux or Context API</a> as a starting point, but provides an API more suitable to my personal taste.

It also applies some principle and code from de @dvo/raven state management library, which I authored.