'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Spinner,
  Chip,
  Switch,
  Tabs,
  Tab,
} from '@heroui/react';
import {
  getChatInquiriesAction,
  ChatInquiry,
  updateChatInquiryCalledAction,
} from '@/app/actions/chat-inquiry';

type FilterType = 'all' | 'uncalled' | 'called';

export default function ChatInquiriesTable() {
  const [inquiries, setInquiries] = useState<ChatInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getChatInquiriesAction();
      if (result.success && result.data) {
        setInquiries(result.data);
      } else {
        setError(result.error || 'Не удалось загрузить заявки');
      }
    } catch (err) {
      setError('Произошла ошибка при загрузке заявок');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleToggleCalled = async (id: number, currentStatus: boolean) => {
    const result = await updateChatInquiryCalledAction(id, !currentStatus);
    if (result.success) {
      setInquiries((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, called: !currentStatus } : item
        )
      );
    }
  };

  // Sort: uncalled first, then called
  const sortedInquiries = [...inquiries].sort((a, b) => {
    if (a.called === b.called) {
      // If same status, sort by created_at descending (newest first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return a.called ? 1 : -1; // uncalled (false) comes before called (true)
  });

  // Filter inquiries based on selected filter
  const filteredInquiries = sortedInquiries.filter((item) => {
    if (filter === 'called') return item.called;
    if (filter === 'uncalled') return !item.called;
    return true; // 'all'
  });

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Имя' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Телефон' },
    { key: 'service', label: 'Услуга' },
    { key: 'website_type', label: 'Тип сайта' },
    { key: 'budget', label: 'Бюджет' },
    { key: 'timeline', label: 'Сроки' },
    { key: 'called', label: 'Статус' },
    { key: 'additional_info', label: 'Дополнительная информация' },
    { key: 'created_at', label: 'Дата создания' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Spinner size="lg" color="primary" />
        <p className="mt-4 text-gray-600">Загрузка заявок...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button color="danger" variant="flat" onPress={loadInquiries}>
          Повторить
        </Button>
      </div>
    );
  }

  if (inquiries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Заявки не найдены.</p>
      </div>
    );
  }

  const uncalledCount = inquiries.filter((item) => !item.called).length;
  const calledCount = inquiries.filter((item) => item.called).length;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Заявки из чата</h2>
        <Button
          color="primary"
          variant="flat"
          onPress={loadInquiries}
          isLoading={loading}
        >
          Обновить
        </Button>
      </div>
      <div className="mb-4">
        <Tabs
          selectedKey={filter}
          onSelectionChange={(key) => setFilter(key as FilterType)}
          variant="underlined"
          classNames={{
            tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
            cursor: 'w-full bg-primary',
            tab: 'max-w-fit px-0 h-12',
            tabContent: 'group-data-[selected=true]:text-primary',
          }}
        >
          <Tab
            key="all"
            title={
              <div className="flex items-center space-x-2">
                <span>Все</span>
                <Chip size="sm" variant="flat" className="bg-gray-200">
                  {inquiries.length}
                </Chip>
              </div>
            }
          />
          <Tab
            key="uncalled"
            title={
              <div className="flex items-center space-x-2">
                <span>Не звонили</span>
                <Chip size="sm" variant="flat" color="warning">
                  {uncalledCount}
                </Chip>
              </div>
            }
          />
          <Tab
            key="called"
            title={
              <div className="flex items-center space-x-2">
                <span>Позвонили</span>
                <Chip size="sm" variant="flat" color="success">
                  {calledCount}
                </Chip>
              </div>
            }
          />
        </Tabs>
      </div>
      <Table
        aria-label="Таблица заявок из чата"
        classNames={{
        }}
        selectionMode="none"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} align="start" className="text-sm">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={filteredInquiries} emptyContent="Заявки не найдены.">
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>
                <span className="font-semibold text-gray-900">{item.id}</span>
              </TableCell>
              <TableCell>
                <span className="font-medium">{item.name || '-'}</span>
              </TableCell>
              <TableCell>
                <a
                  href={`mailto:${item.email}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {item.email || '-'}
                </a>
              </TableCell>
              <TableCell>
                <a
                  href={`tel:${item.phone}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  {item.phone || '-'}
                </a>
              </TableCell>
              <TableCell>
                <Chip
                  size="sm"
                  variant="flat"
                  color="primary"
                  className="font-medium"
                >
                  {item.selected_service || '-'}
                </Chip>
              </TableCell>
              <TableCell>
                <span className="text-sm">{item.website_type || '-'}</span>
              </TableCell>
              <TableCell>
                <span className="font-medium text-green-700">
                  {item.budget || '-'}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{item.timeline || '-'}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Switch
                    size="sm"
                    color={item.called ? 'success' : 'default'}
                    isSelected={item.called}
                    onValueChange={() =>
                      handleToggleCalled(item.id, item.called)
                    }
                  />
                  <Chip
                    size="sm"
                    variant="flat"
                    color={item.called ? 'success' : 'default'}
                    className="font-medium"
                  >
                    {item.called ? 'Позвонили' : 'Не звонили'}
                  </Chip>
                </div>
              </TableCell>
              <TableCell>
                {item.additional_info ? (
                  <span
                    title={item.additional_info}
                    className="block max-w-xs truncate text-sm"
                  >
                    {item.additional_info.length > 50
                      ? `${item.additional_info.substring(0, 50)}...`
                      : item.additional_info}
                  </span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">
                  {formatDate(item.created_at)}
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
