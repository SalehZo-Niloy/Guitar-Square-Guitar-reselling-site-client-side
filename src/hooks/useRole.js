import { useEffect, useState } from "react"

const useRole = email => {
    const [role, setRole] = useState('');
    const [roleLoading, setRoleLoading] = useState(true);

    //----------------------------
    // useEffect sends currently logged in user email to check the role
    //----------------------------
    useEffect(() => {
        fetch(`https://assignment-12-server-two.vercel.app/user/role/${email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setRole(data.role);
                setRoleLoading(false);
            })
    }, [email]);
    return [role, roleLoading];
}

export default useRole;