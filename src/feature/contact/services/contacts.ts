import Contacts from 'react-native-contacts';

export const loadContacts = ({
  setContacts,
}: {
  setContacts: (data: any) => void;
}) => {
  Contacts.getAll()
    .then(contacts => {
      const sortedContacts = contacts.sort((a, b) =>
        a.displayName.localeCompare(b.displayName),
      );
      setContacts(sortedContacts);
    })
    .catch(err => console.error(err));
};
