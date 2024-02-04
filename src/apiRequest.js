const apiRequest = async (url = '', optionObj = '', errMsg = '') => {
    try {
        const response = await fetch(url, optionObj);
        if (!response.ok) throw Error('Please reload the app')
    } catch(err){ 
        errMsg = err.message;
    } finally{
        return errMsg;
    }
}

export default apiRequest;