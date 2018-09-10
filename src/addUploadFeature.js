/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadFeature = requestHandler => (type, resource, params) => {
    if (type === 'CREATE' && resource === 'learning-object-collection') {
        if (params.data.files && params.data.files.rawFile) {
            const reader = new FileReader();
            reader.readAsDataURL(params.data.files.rawFile);
            delete params.data['files'];
            reader.onload = () => requestHandler(type, resource, {
                ...params,
                data: {
                    ...params.data,
                    file: reader.result,
                },
            })
        }
    }
    // for other request types and reources, fall back to the defautl request handler
    return requestHandler(type, resource, params);
};

export default addUploadFeature;