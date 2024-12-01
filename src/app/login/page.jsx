'use client';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const signSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required")
                        .min(8, "Password must be at least 8 characters long")
                        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"),
})

export default function LoginPage() {
    const{register, handleSubmit, reset, formState: {errors}} = useForm({resolver: yupResolver(signSchema)});

    function onSubmit(data){
        console.log(data);
        reset();
    }

    return (
        <div>
            <h1>Login/Signup</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label for="email">Email</label>
                    <input type="email" placeholder="Introduce Email" {...register("email")} />
                    <p>{errors.email && errors.email?.message}</p>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" placeholder="Introduce Password" {...register("password")} />
                    <p>{errors.password && errors.password?.message}</p>
                </div>
                <button type="submit">Login/Signup</button>
            </form>
        </div>
    )
}