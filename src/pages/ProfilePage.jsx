import React from 'react';
import Title from '../components/Title';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const ProfilePage = ({ navigate, profile }) => {
  const handleNicknameChange = (newNickname) => {
    console.log(`Нікнейм змінено на: ${newNickname}`);
  };

  return (
    <div className="page profile-page">
      <Title text="Профіль Гравця" type="h1" />
      
      <Card title="Ваш Нікнейм">
        <Input 
          label="Змінити нікнейм:"
          value={profile.nickname}
          onChange={handleNicknameChange}
        />
      </Card>

      <Card title="Статистика">
        <div className="stat-item">
            <p><strong>Загальна кількість відгаданих слів:</strong></p>
            <span className="stat-value">{profile.wordsGuessed}</span>
        </div>
        <div className="stat-item">
            <p>Найкращий час (5x5):</p>
            <span className="stat-value">45с</span>
        </div>
      </Card>

      <Button onClick={() => navigate('start')}>Повернутися</Button>
    </div>
  );
};

export default ProfilePage;