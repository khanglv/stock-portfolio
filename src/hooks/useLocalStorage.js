import _ from 'lodash';

export default function useLocalLocalStorage(key, objectString, defaultValue = null) {
    try {
        //browser API
        let keyitem = localStorage.getItem(key);
        let values = JSON.parse(keyitem);
        if (objectString instanceof Array) {
            return objectString.map( line => {
                return _.get(values, line, defaultValue)
            })
        }

        if (objectString) {
            return _.get(values, objectString, defaultValue)
        }
        
        return values;
    }catch(e) {
        console.error(e)
        return defaultValue;
    }
}
