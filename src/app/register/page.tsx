export default function Registration() {

    return (
        <>
            <h1>Register</h1>
            <form>
                <div>
                    <label>E-mail</label>
                    <input type="email" placeholder="Your email" name="email" required></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Your password" name="password" minLength={8} required></input>
                </div>
                <input type="submit" value="Register" />
            </form>
        </>
    )
}