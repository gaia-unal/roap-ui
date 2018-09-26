const addUploadFeature = requestHandler => (type, resource, params) => {
    if (type === 'CREATE' && resource === 'learning-object-collection') {
        if (params.data.files && params.data.files.rawFile) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(params.data.files.rawFile);
                reader.onload = () => {
                    resolve({
                        base64File: reader.result.split(',')[1],
                        name: params.data.files.rawFile.name,
                        mimeType: params.data.files.rawFile.type,
                        size: params.data.files.rawFile.size,
                        lastModified: params.data.files.rawFile.lastModified
                    });
                }
                reader.onerror = reject;
            }).then(file => requestHandler(type, resource, {
                ...params,
                data: {
                    ...params.data,
                    file: file,
                },
            }));
        } else {
            // TODO: raise file required
        }
    }
    return requestHandler(type, resource, params);
};

export default addUploadFeature;