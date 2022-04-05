import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from "react";

function SignUp() {

    const form = useForm({
        initialValues: {
            firstName:'',
            lastName:'',
            email: '',
            password:'',
            passwordConfirm:'',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value) ? null : 'Password should be contain 8 characters, 1 number ,1 lowercase character (a-z),1 uppercase character (A-Z)'),
        },
    });
    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>

                <TextInput
                    required
                    label="Prenom"
                    placeholder="firstName"
                    {...form.getInputProps('firstName')}
                />
                <TextInput
                    required
                    label="Nom"
                    placeholder="lastName"
                    {...form.getInputProps('lastName')}
                />
                <TextInput
                    required
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />
                <TextInput
                    required
                    label="Mot de passe"
                    placeholder="Password"
                    {...form.getInputProps('password')}
                />
                <TextInput
                    required
                    label="Confirmer le mot de passe"
                    placeholder="passwordConfirm"
                    {...form.getInputProps('passwordConfirm')}
                />



                <Checkbox
                    mt="md"
                    label="I agree to sell my privacy"
                    {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    );
}


export default SignUp