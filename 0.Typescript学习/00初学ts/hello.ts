function greeter (user: string) {
    return "Hello " + user
}

let user = "Typescript"

document.body.innerHTML = greeter(user)