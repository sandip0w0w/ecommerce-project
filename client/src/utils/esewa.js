const initiatePayment = (esewaData, esewaUrl) => {
    try{
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = esewaUrl;

        Object.entries(esewaData).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    }catch(error){
        console.log(error);
    }

}

export default initiatePayment;