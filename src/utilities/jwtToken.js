export const jwtToken = (user, navigate, from) => {
    const currentUser = {
        email: user?.email
    }
    fetch('http://localhost:5000/jwt', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            localStorage.setItem('token', data.token);

            //----------------------------
            // redirecting to previous page
            //----------------------------
            if (navigate) {
                navigate(from, { replace: true });
            }
        })
        .catch(e => console.error(e))
}