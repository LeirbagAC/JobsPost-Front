import React from 'react';
import { Card, Typography, Tag, Button } from 'antd';
import { AppstoreFilled, BookOutlined } from '@ant-design/icons';
import styles from '@/assets/css/JobCard.module.css';

const { Title, Text } = Typography;

export interface JobProps {
  id: string;
  title: string;
  company: string;
  location: string;
  postedAt: string;
  salaryRange?: string;
  tags: string[];
  isUrgent?: boolean;
  logoColor?: string;
}

export default function JobCard({ 
  title, 
  company, 
  location, 
  postedAt, 
  salaryRange, 
  tags, 
  isUrgent, 
  logoColor = '#1677ff' // Cor padrão caso não seja enviada
}: JobProps) {
  return (
    <Card 
      hoverable 
      className={styles.cardContainer}
      styles={{ body: { padding: '24px' } }} 
    >
      <div className={styles.cardHeader}>
        <div className={styles.companyInfo}>
          <div className={styles.logoPlaceholder}>
            <AppstoreFilled style={{ color: logoColor, fontSize: '20px' }} />
          </div>
          
          <div>
            <div className={styles.titleWrapper}>
              <Title level={5} style={{ margin: 0 }}>{title}</Title>
              {isUrgent && (
                <Tag color="error" className={styles.urgentTag}>URGENTE</Tag>
              )}
            </div>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              {company} • {location} • {postedAt}
            </Text>
          </div>
        </div>
        
        {/* Área do Salário e Botão de Salvar */}
        <div className={styles.salaryArea}>
          {salaryRange && (
            <Text strong style={{ fontSize: '15px' }}>{salaryRange}</Text>
          )}
          <Button 
            type="text" 
            icon={<BookOutlined style={{ fontSize: '18px', color: '#6b7280' }} />} 
          />
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <Tag key={index} bordered={false} className={styles.customTag}>
              {tag}
            </Tag>
          ))}
        </div>
        
        <Button className={styles.detailsBtn}>
          Detalhes
        </Button>
      </div>
    </Card>
  );
}