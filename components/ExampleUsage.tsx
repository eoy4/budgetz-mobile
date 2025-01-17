import { useAuth } from '@/contexts/AuthContext';
import { createDocument, getDocument, queryDocuments } from '@/utils/firestore';
import { callFunction } from '@/utils/functions';
import { ThemedView } from './ThemedView';

export function ExampleUsage() {
  const { user, signIn, signOut } = useAuth();

  const handleCreateDocument = async () => {
    try {
      const docId = await createDocument('users', {
        name: 'John Doe',
        email: user?.email,
      });
      console.log('Document created with ID:', docId);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleQuery = async () => {
    try {
      const users = await queryDocuments('users', [
        ['email', '==', user?.email]
      ]);
      console.log('Query results:', users);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCallFunction = async () => {
    try {
      const result = await callFunction('yourFunctionName', {
        userId: user?.uid
      });
      console.log('Function result:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ThemedView>
      {/* Your UI components here */}
    </ThemedView>
  );
} 