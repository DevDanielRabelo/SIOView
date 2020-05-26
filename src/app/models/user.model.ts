export class User {
    _id: string
    // dados principais
    main_data: {
        // nome
        name: string
        // sobrenome
        last_name: string
        // email (Maui)
        email: string
        // senha
        password: string
        // rota do arquivo
        avatar: string
        // genero
        genre: string
        // cargo
        office: string
        // nivel de acesso
        access: number
        // ulimo acesso
        last_access: Date
        //aniversario
        birthday: Date
        //data de admissão
        admission_date: Date
    }
    // documentos pessoais
    personal_documents: {
        // nome completo
        full_name: string
        // cpf
        CPF: Number
        // rg
        RG: string
        // cnh
        CNH: Number
        // titulo de eleitor
        voter_title: Number
        // data de nascimento
        date_of_birth: string
    }
    // contatos
    contacts: {
        // telefone res
        telephone_res: Number
        // telefone cel
        telephone_cel: Number
        // e-mail pessoal
        email_personal: string
        // contato de um familiar mais proximo
        contact_family: {
            // nome
            name: string
            // telefone celular
            telephone_res: Number
            // telefone residencial
            telephone_cel: Number
            // grau de parentesco
            kinship: string
        }
        // endereço
        address: {
            // cep
            CEP: Number
            // rua/av
            public_place: string
            // numero
            number: Number
            // complemento
            complement: string
            // bairro
            neighborhood: string
            // cidade
            city: string
            // estado
            state: string
            // país
            parents: string
        }
    }
    // social
    social: {
        // faceboook
        faceboook: string
        // linkedIn
        linkedIn: string
        // instagram
        instagram: string
        // twitter
        twitter: string
        // youtube
        youtube: string
    }
}

