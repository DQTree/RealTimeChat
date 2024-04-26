export default function ServerButton({id, name, image}: {id: number, name: string, image: string}) {

    return(
        <div className="server" id={name}>
            {name[0]}
        </div>
    )
}