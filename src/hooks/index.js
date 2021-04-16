export { default as useLocalLocalStorage } from './useLocalStorage'

let hooks = {}

export function useRootHooks(name, ref) {
    if(name && ref) {
        hooks[name] = ref;
    }

    if (name && !ref) {
        return hooks[name]
    }
    
    return hooks;
}