
export const SEND_MOCK_DATA_TO_TASK_DRAFT = 'SEND_MOCK_DATA_TO_TASK_DRAFT';

export const sendMockDataToTaskDraft = (mockData) => ({
    type: SEND_MOCK_DATA_TO_TASK_DRAFT,
    mockData
});
