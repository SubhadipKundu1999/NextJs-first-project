export default function userProfile({params}:any){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p><span>Hello</span> <span className="text- rounded bg-red-300 p-2">{params.id}</span></p>
        </div>
    )
}