import React from 'react';
import { JobPost } from '@/types';
import { Typography, Tag } from 'antd';
import styles from '@/assets/css/page.module.css';
import { AppstoreFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

interface JobCardProps {
  job: JobPost;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className={styles.jobCard}>
      <div className={styles.cardHeader}>
        <div className={styles.companyInfo}>
          <div className={styles.logoPlaceholder}>
            <AppstoreFilled style={{ color: '#1677ff', fontSize: '20px' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Title level={5} style={{ margin: 0 }}>{job.postProfile}</Title>
            </div>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              Experiência requerida: {job.reqExperience} anos
            </Text>
          </div>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.tagsContainer}>
          {job.postTechStack.map((tech, index) => (
            <Tag key={index} className={styles.customTag}>
              {tech}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}