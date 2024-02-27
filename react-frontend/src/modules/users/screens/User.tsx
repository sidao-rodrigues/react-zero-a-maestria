import Screen from '../../../shared/components/screen/Screen';
import { useUser } from '../hooks/useUser';

const User: React.FC = () => {
  const { users } = useUser();
  return (
    <Screen>
      <div>Users</div>
    </Screen>
  );
};

export default User;
