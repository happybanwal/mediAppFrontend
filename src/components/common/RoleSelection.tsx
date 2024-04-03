import React from 'react';
import { View } from 'react-native';
import { DefaultTheme, RadioButton } from 'react-native-paper';

interface RoleSelectionProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ selectedRole, onRoleChange }) => {
  return (
    <View>
      <RadioButton.Group onValueChange={onRoleChange} value={selectedRole}>
        <RadioButton.Item label="Patient" value="patient" theme={DefaultTheme} color='#6A5BC2' />
        <RadioButton.Item label="Doctor" value="doctor" color='#6A5BC2'/>
      </RadioButton.Group>
    </View>
  );
};

export default RoleSelection;
