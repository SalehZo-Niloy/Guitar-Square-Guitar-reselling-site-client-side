import { useEffect, useState } from "react"

const useRole = email => {
    const [role, setRole] = useState('');
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/user/role/${email}`)
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