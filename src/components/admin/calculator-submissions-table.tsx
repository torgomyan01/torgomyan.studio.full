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
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react';
import {
  getCalculatorSubmissionsAction,
  CalculatorSubmission,
  updateCalculatorSubmissionContactedAction,
  updateCalculatorSubmissionNotesAction,
} from '@/app/actions/calculator';

type FilterType = 'all' | 'uncontacted' | 'contacted';

export default function CalculatorSubmissionsTable() {
  const [submissions, setSubmissions] = useState<CalculatorSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSubmission, setSelectedSubmission] =
    useState<CalculatorSubmission | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getCalculatorSubmissionsAction();
      if (result.success && result.data) {
        setSubmissions(result.data);
      } else {
        setError(result.error || 'Не удалось загрузить заявки из калькулятора');
      }
    } catch (err) {
      setError('Произошла ошибка при загрузке заявок из калькулятора');
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

  const formatPrice = (price: number | null) => {
    if (!price) return '-';
    return `${price.toLocaleString('ru-RU')} ₽`;
  };

  const handleToggleContacted = async (id: number, currentStatus: boolean) => {
    const result = await updateCalculatorSubmissionContactedAction(
      id,
      !currentStatus
    );
    if (result.success) {
      setSubmissions((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, contacted: !currentStatus } : item
        )
      );
    }
  };

  const handleViewDetails = (submission: CalculatorSubmission) => {
    setSelectedSubmission(submission);
    setNotes(submission.notes || '');
    onOpen();
  };

  // Sort: uncontacted first, then contacted
  const sortedSubmissions = [...submissions].sort((a, b) => {
    if (a.contacted === b.contacted) {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    return a.contacted ? 1 : -1;
  });

  // Filter submissions based on selected filter
  const filteredSubmissions = sortedSubmissions.filter((item) => {
    if (filter === 'contacted') return item.contacted;
    if (filter === 'uncontacted') return !item.contacted;
    return true;
  });

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Имя' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Телефон' },
    { key: 'website_type', label: 'Тип сайта' },
    { key: 'estimated_price', label: 'Примерная стоимость' },
    { key: 'contacted', label: 'Статус' },
    { key: 'created_at', label: 'Дата создания' },
    { key: 'actions', label: 'Действия' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Spinner size="lg" color="primary" />
        <p className="mt-4 text-gray-600">Загрузка заявок из калькулятора...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button color="danger" variant="flat" onPress={loadSubmissions}>
          Повторить
        </Button>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Заявки из калькулятора не найдены.</p>
      </div>
    );
  }

  const uncontactedCount = submissions.filter((item) => !item.contacted).length;
  const contactedCount = submissions.filter((item) => item.contacted).length;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Заявки из калькулятора
        </h2>
        <Button
          color="primary"
          variant="flat"
          onPress={loadSubmissions}
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
            tabList:
              'gap-6 w-full relative rounded-none p-0 border-b border-divider',
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
                  {submissions.length}
                </Chip>
              </div>
            }
          />
          <Tab
            key="uncontacted"
            title={
              <div className="flex items-center space-x-2">
                <span>Не связались</span>
                <Chip size="sm" variant="flat" color="warning">
                  {uncontactedCount}
                </Chip>
              </div>
            }
          />
          <Tab
            key="contacted"
            title={
              <div className="flex items-center space-x-2">
                <span>Связались</span>
                <Chip size="sm" variant="flat" color="success">
                  {contactedCount}
                </Chip>
              </div>
            }
          />
        </Tabs>
      </div>
      <Table aria-label="Таблица заявок из калькулятора" selectionMode="none">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} align="start" className="text-sm">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={filteredSubmissions}
          emptyContent="Заявки из калькулятора не найдены."
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>
                <span className="font-semibold text-gray-900">{item.id}</span>
              </TableCell>
              <TableCell>
                <span className="font-medium">{item.name}</span>
              </TableCell>
              <TableCell>
                <a
                  href={`mailto:${item.email}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {item.email}
                </a>
              </TableCell>
              <TableCell>
                <a
                  href={`tel:${item.phone}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  {item.phone}
                </a>
              </TableCell>
              <TableCell>
                <Chip
                  size="sm"
                  variant="flat"
                  color="primary"
                  className="font-medium"
                >
                  {item.website_type || '-'}
                </Chip>
              </TableCell>
              <TableCell>
                <span className="font-medium text-green-700">
                  {formatPrice(item.estimated_price)}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Switch
                    size="sm"
                    color={item.contacted ? 'success' : 'default'}
                    isSelected={item.contacted}
                    onValueChange={() =>
                      handleToggleContacted(item.id, item.contacted)
                    }
                  />
                  <Chip
                    size="sm"
                    variant="flat"
                    color={item.contacted ? 'success' : 'default'}
                    className="font-medium"
                  >
                    {item.contacted ? 'Связались' : 'Не связались'}
                  </Chip>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">
                  {formatDate(item.created_at)}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="flat"
                  color="primary"
                  onPress={() => handleViewDetails(item)}
                >
                  Детали
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>Детали заявки из калькулятора</ModalHeader>
          <ModalBody>
            {selectedSubmission && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Имя</p>
                    <p className="text-sm text-gray-900">
                      {selectedSubmission.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Email</p>
                    <a
                      href={`mailto:${selectedSubmission.email}`}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {selectedSubmission.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Телефон
                    </p>
                    <a
                      href={`tel:${selectedSubmission.phone}`}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {selectedSubmission.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Примерная стоимость
                    </p>
                    <p className="text-sm text-green-700 font-semibold">
                      {formatPrice(selectedSubmission.estimated_price)}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Параметры сайта
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Тип сайта
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedSubmission.website_type || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Количество страниц
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedSubmission.pages_count || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Стиль дизайна
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedSubmission.design_style || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Платежные системы
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedSubmission.payment_systems || '-'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Дополнительные функции
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubmission.cms_required && (
                      <Chip size="sm" variant="flat" color="primary">
                        CMS система
                      </Chip>
                    )}
                    {selectedSubmission.ecommerce && (
                      <Chip size="sm" variant="flat" color="primary">
                        Интернет-магазин
                      </Chip>
                    )}
                    {selectedSubmission.mobile_app && (
                      <Chip size="sm" variant="flat" color="primary">
                        Мобильное приложение
                      </Chip>
                    )}
                    {selectedSubmission.seo_optimization && (
                      <Chip size="sm" variant="flat" color="primary">
                        SEO оптимизация
                      </Chip>
                    )}
                    {selectedSubmission.content_management && (
                      <Chip size="sm" variant="flat" color="primary">
                        Управление контентом
                      </Chip>
                    )}
                    {selectedSubmission.features && (
                      <Chip size="sm" variant="flat" color="secondary">
                        {selectedSubmission.features}
                      </Chip>
                    )}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Заметки
                  </p>
                  <Textarea
                    placeholder="Введите заметки о клиенте..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    minRows={3}
                  />
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
