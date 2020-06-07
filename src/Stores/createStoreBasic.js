import { useState, useEffect } from 'react'

const createStore = () => {
  const sections = {}
  
  const setState = (sectionName = '_') => newState => {
    sections[sectionName].state = { ...sections[sectionName].state, ...newState }
    runCallbacks(sectionName)
  }

  const runCallbacks = sectionName => {
    sections[sectionName].listeners.forEach(callback => {
      callback(sections[sectionName].state)
    })
  }

  const load = (sectionName = '_', initialState) => {
    sections[sectionName] = {
      listeners: [],
      state: initialState
    }
  }

  const useStore = sectionName => {
    const setNewState = useState()[1]
    useEffect(() => {
      sections[sectionName].listeners.push(setNewState)
      return () => {
        sections[sectionName].listeners = sections[sectionName].listeners
          .filter(callback => callback !== setNewState)
      }
    }, [])

    return [sections[sectionName].state, setState(sectionName)]
  }

  return [useStore, load]
}

export default createStore