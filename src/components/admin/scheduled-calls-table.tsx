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
  getScheduledCallsAction,
  ScheduledCall,
  updateScheduledCallCalledAction,
  updateScheduledCallNotesAction,
  deleteScheduledCallAction,
  sendGoogleMeetEmailAction,
  updateScheduledCallEmailSentAction,
} from '@/app/actions/scheduled-calls';

type FilterType = 'all' | 'uncalled' | 'called';

export default function ScheduledCallsTable() {
  const [calls, setCalls] = useState<ScheduledCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCall, setSelectedCall] = useState<ScheduledCall | null>(null);
  const [notes, setNotes] = useState('');
  const [sendingEmail, setSendingEmail] = useState<number | null>(null);

  useEffect(() => {
    loadCalls();
  }, []);

  const loadCalls = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getScheduledCallsAction();
      if (result.success && result.data) {
        setCalls(result.data);
      } else {
        setError(result.error || 'Не удалось загрузить запланированные звонки');
      }
    } catch (err) {
      setError('Произошла ошибка при загрузке запланированных звонков');
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

  const formatScheduledDateTime = (date: string, time: string) => {
    return `${date} ${time}`;
  };

  const handleToggleCalled = async (id: number, currentStatus: boolean) => {
    const result = await updateScheduledCallCalledAction(id, !currentStatus);
    if (result.success) {
      setCalls((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, called: !currentStatus } : item
        )
      );
    }
  };

  const handleEditNotes = (call: ScheduledCall) => {
    setSelectedCall(call);
    setNotes(call.notes || '');
    onOpen();
  };

  const handleSaveNotes = async () => {
    if (!selectedCall) return;
    const result = await updateScheduledCallNotesAction(selectedCall.id, notes);
    if (result.success) {
      setCalls((prev) =>
        prev.map((item) =>
          item.id === selectedCall.id ? { ...item, notes } : item
        )
      );
      onClose();
      setSelectedCall(null);
      setNotes('');
    }
  };

  const handleDelete = async (id: number) => {
    if (
      !confirm('Вы уверены, что хотите удалить этот запланированный звонок?')
    ) {
      return;
    }
    const result = await deleteScheduledCallAction(id);
    if (result.success) {
      setCalls((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSendEmail = async (call: ScheduledCall) => {
    setSendingEmail(call.id);
    try {
      const result = await sendGoogleMeetEmailAction(call.id);
      if (result.success) {
        // Update local state to reflect email_sent status
        setCalls((prev) =>
          prev.map((item) =>
            item.id === call.id ? { ...item, email_sent: true } : item
          )
        );
        alert('Email с Google Meet ссылкой успешно отправлен!');
      } else {
        alert(`Ошибка при отправке email: ${result.error}`);
      }
    } catch (error) {
      alert('Произошла ошибка при отправке email');
      console.error(error);
    } finally {
      setSendingEmail(null);
    }
  };

  const handleToggleEmailSent = async (id: number, currentStatus: boolean) => {
    const result = await updateScheduledCallEmailSentAction(id, !currentStatus);
    if (result.success) {
      setCalls((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, email_sent: !currentStatus } : item
        )
      );
    }
  };

  // Sort: uncalled first, then called
  const sortedCalls = [...calls].sort((a, b) => {
    if (a.called === b.called) {
      // If same status, sort by scheduled date/time
      const dateA = `${a.scheduled_date} ${a.scheduled_time}`;
      const dateB = `${b.scheduled_date} ${b.scheduled_time}`;
      return dateB.localeCompare(dateA);
    }
    return a.called ? 1 : -1; // uncalled (false) comes before called (true)
  });

  // Filter calls based on selected filter
  const filteredCalls = sortedCalls.filter((item) => {
    if (filter === 'called') return item.called;
    if (filter === 'uncalled') return !item.called;
    return true; // 'all'
  });

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Имя' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Телефон' },
    { key: 'discount', label: 'Скидка' },
    { key: 'scheduled_date', label: 'Дата' },
    { key: 'scheduled_time', label: 'Время' },
    { key: 'email_sent', label: 'Email отправлен' },
    { key: 'called', label: 'Статус' },
    { key: 'notes', label: 'Заметки' },
    { key: 'created_at', label: 'Дата создания' },
    { key: 'actions', label: 'Действия' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Spinner size="lg" color="primary" />
        <p className="mt-4 text-gray-600">
          Загрузка запланированных звонков...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button color="danger" variant="flat" onPress={loadCalls}>
          Повторить
        </Button>
      </div>
    );
  }

  if (calls.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Запланированные звонки не найдены.</p>
      </div>
    );
  }

  const uncalledCount = calls.filter((item) => !item.called).length;
  const calledCount = calls.filter((item) => item.called).length;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Запланированные звонки
        </h2>
        <Button
          color="primary"
          variant="flat"
          onPress={loadCalls}
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
                  {calls.length}
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
      <Table aria-label="Таблица запланированных звонков" selectionMode="none">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} align="start" className="text-sm">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={filteredCalls}
          emptyContent="Запланированные звонки не найдены."
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
                {item.discount_eligible && item.discount_percentage ? (
                  <Chip
                    size="sm"
                    variant="flat"
                    color="danger"
                    className="font-bold bg-red-100 text-red-700 border border-red-300"
                  >
                    {item.discount_percentage}% СКИДКА
                  </Chip>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
              <TableCell>
                <span className="font-medium">{item.scheduled_date}</span>
              </TableCell>
              <TableCell>
                <span className="font-medium">{item.scheduled_time}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Switch
                    size="sm"
                    color={item.email_sent ? 'success' : 'default'}
                    isSelected={item.email_sent}
                    onValueChange={() =>
                      handleToggleEmailSent(item.id, item.email_sent)
                    }
                  />
                  <Chip
                    size="sm"
                    variant="flat"
                    color={item.email_sent ? 'success' : 'default'}
                    className="font-medium"
                  >
                    {item.email_sent ? 'Отправлен' : 'Не отправлен'}
                  </Chip>
                </div>
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
                {item.notes ? (
                  <span
                    title={item.notes}
                    className="block max-w-xs truncate text-sm"
                  >
                    {item.notes.length > 30
                      ? `${item.notes.substring(0, 30)}...`
                      : item.notes}
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
              <TableCell>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    onPress={() => handleEditNotes(item)}
                  >
                    Заметки
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    onPress={() => handleDelete(item.id)}
                  >
                    Удалить
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          <ModalHeader>Редактировать заметки</ModalHeader>
          <ModalBody>
            {selectedCall && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Имя:</strong> {selectedCall.name}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Телефон:</strong> {selectedCall.phone}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Запланировано:</strong>{' '}
                    {formatScheduledDateTime(
                      selectedCall.scheduled_date,
                      selectedCall.scheduled_time
                    )}
                  </p>
                  {selectedCall.discount_eligible &&
                    selectedCall.discount_percentage && (
                      <div className="mb-4">
                        <Chip
                          size="md"
                          variant="flat"
                          color="danger"
                          className="font-bold bg-red-100 text-red-700 border border-red-300"
                        >
                          ⚠️ {selectedCall.discount_percentage}% СКИДКА
                        </Chip>
                        <p className="text-xs text-gray-500 mt-2">
                          Клиент отправил заявку со скидкой из popup.
                          Обязательно упомяните это при разговоре!
                        </p>
                      </div>
                    )}
                </div>
                <Textarea
                  label="Заметки"
                  placeholder="Введите заметки о звонке..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  minRows={4}
                />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Отмена
            </Button>
            <Button color="primary" onPress={handleSaveNotes}>
              Сохранить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
