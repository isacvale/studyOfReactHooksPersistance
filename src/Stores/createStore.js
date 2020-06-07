import { useState, useEffect } from 'react'

const isArray = Array.isArray

const isObject = target =>
  typeof target === 'object'
  && !isArray(target)
  && target !== null

const reach = queryObject => stringPath => {
  const arrayPath = stringPath.split('.')

  const reachInside = (queryObject, path) => {
    if (path.length === 1) {
      return ({
        parentObject: queryObject,
        propertyName: path[0],
        propertyValue: queryObject[path[0]]
      })
    }
    const clonedArray = [...path]
    const nextProp = clonedArray.shift()
    const nextObject = queryObject[nextProp]
    return reachInside(nextObject, clonedArray)
  }

  return reachInside(queryObject, arrayPath)
}

const unfoldStringPath = stringPath => {
  const arrayPath = stringPath.split('.')
  return arrayPath.reduce((acc, cur, idx) => {
    if (idx === 0) return [cur]
    const lastItem = acc[idx - 1]
    return [...acc, [[lastItem], [cur]].join('.')]
  }, [])
}

const createStore = initialState => {
  const listeners = {}
  const state = initialState

  const setState = stringPath => newState => {
    const { parentObject, propertyName, propertyValue } = reach(state)(stringPath)
    console.log('pre-State', state)
    console.log('newState', newState)
    if (isObject(propertyValue)) {
      parentObject[propertyName] = {
        ...parentObject[propertyName],
        ...newState
      }
    } else {
      parentObject[propertyName] = newState
    }
    console.log('post-State', state)

    window.listeners = listeners
    window.state = state
    runCallback(stringPath)
  }

  const runCallback = stringPath => {
    // console.log('stringPath', stringPath, 'value', reach(state)(stringPath)['propertyValue'])
    // listeners[stringPath].forEach(cbk => cbk(reach(state)(stringPath)['propertyValue']))
    const allPaths = unfoldStringPath(stringPath)
      // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
      // console.log('allPaths', allPaths)

      allPaths.forEach(path => {
      const value = reach(state)(path)['propertyValue']
      listeners[path].forEach(cbk => {
        // console.log('path', path, 'value', value)
        cbk(value)
      })
    })
  }
  
  const useStore = stringPath => {
    const callback = useState()[1]

    useEffect(() => {
      if (!listeners[stringPath])
        listeners[stringPath] = []
      listeners[stringPath].push(callback)

      return () => {
        listeners[stringPath] = listeners[stringPath]
          .filter(cbk => cbk !== callback)
      }
    }, [])
    
    const value = reach(state)(stringPath)['propertyValue']
    return [value, setState(stringPath)]
  }
  return useStore
}

export default createStore