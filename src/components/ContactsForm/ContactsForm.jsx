import { useState } from "react";
import shortid from "shortid";
import PropTypes from 'prop-types';
import {FormWrapper, AddForm, AddLabel, AddInput, AddButton} from './ContactsForm.styled'

function ContactsForm({onSubmit})  {
    const nameInputId = shortid.generate();
    const numberInputId = shortid.generate()

    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const handleChange = evt => {
        const { name, value } = evt.target

        switch (name) {
            case 'name':
                setName(value);
                break;
            
            case 'number':
                setNumber(value);
                break;
            
            default:
                return;
        }

    }
  
    const handleSubmit = evt => {
        evt.preventDefault()

        const newContact = {name, number}

        onSubmit(newContact)
        reset()
    }
    
    const reset = () => {
        setName('')
        setNumber('')
    }

        return (
            <FormWrapper>
                <AddForm autoComplete="off"
                    onSubmit={handleSubmit}
                >
                <AddLabel htmlFor={nameInputId}>
                Name
                <AddInput
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={handleChange}
                    value={name}
                    id={nameInputId}
                />
                </AddLabel>
                    
                <AddLabel htmlFor={numberInputId}>
                Number
                <AddInput
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={handleChange}
                    value={number}
                    id={numberInputId}
                />
                </AddLabel>
                <AddButton type="submit">Add Contact</AddButton>
                </AddForm>
            </FormWrapper>
        )
}

ContactsForm.propTypes = {
    name: PropTypes.string,
    number: PropTypes.number,
    numberInputId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    ]),
    handleChange: PropTypes.func,
}

export default ContactsForm